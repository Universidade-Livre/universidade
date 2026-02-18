"use client";

import { ReactNode, useEffect, useRef } from "react";

interface ViewportAnchorProps {
  children: ReactNode;
  className?: string;
}

const ViewportAnchor = ({ children, className }: ViewportAnchorProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};

export default ViewportAnchor;
