import React from "react";

interface SectionHeaderProps {
  title: string;
  action?: React.ReactNode;
}

export default function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
        {title}
      </h3>
      {action && <div>{action}</div>}
    </div>
  );
}
