"use client";

import CourseNode from "@/components/modules/courses/course/node-graphs/course-node";
import { Course } from "@/types/course/course.interface";
import {
  Background,
  MarkerType,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect, useMemo } from "react";

const buildCourseGraph = (course: Course) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  course.semesters.forEach((semester) => {
    semester.subjects.forEach((subject, subjectIndex) => {
      nodes.push({
        id: subject.id,
        type: "courseNode",
        data: {
          name: subject.name,
          prerequisites: subject.prerequisites.map((prerequisite) => prerequisite.name),
          semester: semester.number,
        },
        position: {
          x: (semester.number - 1) * 300,
          y: 170 * subjectIndex,
        },
      });
    });
  });

  course.semesters.forEach((semester) => {
    semester.subjects.forEach((subject) => {
      subject.prerequisites.forEach((prerequisite) => {
        if (!nodes.some((node) => node.id === prerequisite.id)) return;
        if (edges.some((edge) => edge.id === `e-${prerequisite.id}-${subject.id}`)) return;

        edges.push({
          id: `e-${prerequisite.id}-${subject.id}`,
          source: prerequisite.id,
          target: subject.id,
          type: "smoothstep",
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#9aa3b0",
          },
          animated: false,
          style: {
            strokeWidth: 1.6,
            stroke: "#9aa3b0",
            opacity: 0.75,
          },
        });
      });
    });
  });

  return { initialNodes: nodes, initialEdges: edges };
};

const CourseGraph = ({ course }: { course: Course }) => {
  const flow = useMemo(() => buildCourseGraph(course), [course]);
  const [nodes, setNodes, onNodesChange] = useNodesState(flow.initialNodes);
  const [edges, setEdges] = useEdgesState(flow.initialEdges);

  useEffect(() => {
    setNodes(flow.initialNodes);
    setEdges(flow.initialEdges);
  }, [flow, setEdges, setNodes]);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        proOptions={{ hideAttribution: true }}
        onNodesChange={onNodesChange}
        onNodeClick={(_event, selectedNode) => {
          const connectedSet: Set<string> = new Set<string>();
          edges.forEach((edge) => {
            if (edge.source === selectedNode.id) {
              connectedSet.add(edge.target);
            } else if (edge.target === selectedNode.id) {
              connectedSet.add(edge.source);
            }
          });

          setEdges((eds) =>
            eds.map((edge) => {
              const isConnectedEdge: boolean =
                edge.source === selectedNode.id ||
                edge.target === selectedNode.id;

              return {
                ...edge,
                animated: isConnectedEdge,
                style: {
                  stroke: isConnectedEdge
                    ? "#f59e0b"
                    : "#9aa3b0",
                  strokeWidth: isConnectedEdge
                    ? 2.4
                    : 1.6,
                  opacity: isConnectedEdge
                    ? 0.95
                    : 0.75,
                },
              };
            }),
          );

          setNodes((nds) =>
            nds.map((node) => ({
              ...node,
              data: {
                ...node.data,
                isClicked: node.id === selectedNode.id,
                isSelected: connectedSet.has(node.id),
                hasActiveSelection: true,
              },
            })),
          );
        }}
        onPaneClick={() => {
          setEdges((eds) =>
            eds.map((edge) => ({
              ...edge,
              animated: false,
              style: {
                strokeWidth: 1.6,
                stroke: "#9aa3b0",
                opacity: 0.75,
              },
            })),
          );
          setNodes((nds) =>
            nds.map((node) => ({
              ...node,
              data: {
                ...node.data,
                isSelected: false,
                isClicked: false,
                hasActiveSelection: false,
              },
            })),
          );
        }}
        nodeTypes={{
          courseNode: CourseNode,
        }}
        minZoom={0.2}
        maxZoom={1}
        fitView
        fitViewOptions={{ padding: 0.2, maxZoom: 0.8, minZoom: 0.5 }}
      >
        <Background gap={24} size={1.8} color="#94a3b866" />
      </ReactFlow>
    </div>
  );
};

export default CourseGraph;
