"use client";

import {
  Background,
  MarkerType,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
} from "@xyflow/react";
import React from "react";
import "@xyflow/react/dist/style.css";
import Course from "@/types/course/course.interface";
import CourseNode from "@/components/modules/courses/course/node-graphs/course-node";

interface CourseGraphNode extends Node {
  data: {
    name: string;
    preReq: string[];
    semester: number;
    isSelected?: boolean;
    isClicked?: boolean;
    hasActiveSelection?: boolean;
  };
  position: {
    x: number;
    y: number;
  };
}

const edgeColor: string = "#9aa3b0";

const buildCourseGraph = (course: Course) => {
  const nodes: CourseGraphNode[] = [];
  const edges: Edge[] = [];

  course.semesters.forEach((semester) => {
    semester.subjects.forEach((subject, subjectIndex) => {
      const nodeId = subject.name;
      nodes.push({
        id: nodeId,
        type: "courseNode",
        data: {
          name: subject.name,
          preReq: subject.prerequisites,
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
      if (subject.prerequisites && subject.prerequisites.length > 0) {
        subject.prerequisites.forEach((preReq) => {
          const sourceExist = nodes.find((node) => node.id === preReq);
          if (!sourceExist) return;
          edges.push({
            id: `e-${preReq}-${subject.name}`,
            source: preReq,
            target: subject.name,
            type: "smoothstep",
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: edgeColor,
            },
            animated: false,
            style: {
              strokeWidth: 1.6,
              stroke: edgeColor,
              opacity: 0.75,
            },
          });
        });
      }
    });
  });

  return { initialNodes: nodes, initialEdges: edges };
};

const CourseGraph = ({ course }: { course: Course }) => {
  const flow = React.useMemo(() => buildCourseGraph(course), [course]);
  const [nodes, setNodes, onNodesChange] = useNodesState(flow.initialNodes);
  const [edges, setEdges] = useEdgesState(flow.initialEdges);

  React.useEffect(() => {
    setNodes(flow.initialNodes);
    setEdges(flow.initialEdges);
  }, [flow, setEdges, setNodes]);

  const fitViewOptions = {
    padding: 0.2,
    maxZoom: 0.8,
    minZoom: 0.5,
  };

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        proOptions={{ hideAttribution: true }}
        onNodesChange={onNodesChange}
        onNodeClick={(_event, selectedNode: CourseGraphNode) => {
          if (!selectedNode) return;
          const connectedSet = new Set<string>();
          edges.forEach((edge) => {
            if (edge.source === selectedNode.id) {
              connectedSet.add(edge.target);
            } else if (edge.target === selectedNode.id) {
              connectedSet.add(edge.source);
            }
          });

          setEdges((eds) =>
            eds.map((edge) => {
              const isConnectedEdge =
                edge.source === selectedNode.id ||
                edge.target === selectedNode.id;
              return {
                ...edge,
                animated: isConnectedEdge,
                style: {
                  stroke: isConnectedEdge ? "#f59e0b" : edgeColor,
                  strokeWidth: isConnectedEdge ? 2.4 : 1.6,
                  opacity: isConnectedEdge ? 0.95 : 0.75,
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
                stroke: edgeColor,
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
        fitViewOptions={fitViewOptions}
      >
        <Background gap={24} size={1.8} color="#94a3b866" />
      </ReactFlow>
    </div>
  );
};

export default CourseGraph;
