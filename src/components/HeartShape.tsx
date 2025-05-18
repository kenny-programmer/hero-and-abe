import React from "react";

interface HeartShapeProps {
  className?: string;
  children?: React.ReactNode;
}

const HeartShape: React.FC<HeartShapeProps> = ({ className, children }) => {
  return (
    <div className={`relative mx-auto ${className}`}>
      <div className="heart-shape text-wedding-primary flex items-center justify-center">
        <div className="relative z-10 text-center px-8 pt-8 pb-16">
          {children}
        </div>
      </div>
    </div>
  );
};

export default HeartShape;
