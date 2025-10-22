import React, { useRef, useState, useEffect } from "react";
import {
  IconDotsVertical,
  IconEye,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { Deployment } from "./data";
import Table from "@/components/common/Table";

interface TableSectionProps {
  data: Deployment[];
}

export default function TableSection({ data }: TableSectionProps) {
  const [openActionIndex, setOpenActionIndex] = useState<number | null>(null);
  const actionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle clicking outside the action dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openActionIndex !== null &&
        actionRefs.current[openActionIndex] &&
        !actionRefs.current[openActionIndex]?.contains(event.target as Node)
      ) {
        setOpenActionIndex(null);
      }
    }

    if (openActionIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openActionIndex]);

  const toggleActionMenu = (index: number) => {
    setOpenActionIndex(openActionIndex === index ? null : index);
  };

  return (
    <Table<Deployment>
      className="overflow-hidden"
      columns={[
        {
          header: "Name",
          accessor: (deployment) => (
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-neutral-100 dark:bg-neutral-900 rounded-md border border-neutral-200 dark:border-neutral-800">
                {deployment.icon}
              </div>
              <div>
                <div className="font-medium text-neutral-900 dark:text-neutral-100">
                  {deployment.name}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 max-w-52 truncate">
                  {deployment.description}
                </div>
              </div>
            </div>
          ),
        },
        {
          header: "Status",
          accessor: (deployment) => (
            <span
              className={`
                px-2.5 py-0.5 rounded-full text-[10px] font-medium inline-flex items-center
                ${
                  deployment.status === "process"
                    ? "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                    : ""
                }
                ${
                  deployment.status === "ready"
                    ? "bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/30 text-blue-400 dark:text-blue-300"
                    : ""
                }
                ${
                  deployment.status === "error"
                    ? "bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 text-red-700 dark:text-red-300"
                    : ""
                }
              `}
            >
              {deployment.status === "process" && (
                <span className="w-1.5 h-1.5 bg-yellow-500 dark:bg-yellow-400 rounded-full mr-1.5 animate-pulse" />
              )}
              {deployment.status.charAt(0).toUpperCase() +
                deployment.status.slice(1)}
            </span>
          ),
        },
        { header: "Last Deployed", accessor: "date" },
        { header: "Environment", accessor: "environment" },
        { header: "Version", accessor: "version" },
        {
          header: "Actions",
          accessor: (deployment, index) => (
            <div
              className="inline-block relative"
              ref={(el) => {
                actionRefs.current[index] = el;
              }}
            >
              <button
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                onClick={() => toggleActionMenu(index)}
                aria-label="Open actions menu"
                aria-expanded={openActionIndex === index}
                aria-haspopup="menu"
              >
                <IconDotsVertical size={16} />
              </button>
              {openActionIndex === index && (
                <div
                  className="absolute right-0 mt-1 w-36 bg-white dark:bg-neutral-800 rounded-md shadow-lg border border-neutral-200 dark:border-neutral-700 py-1 z-20 animate-in fade-in duration-150"
                  role="menu"
                >
                  <button
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-left transition-colors"
                    role="menuitem"
                    aria-label="View deployment details"
                  >
                    <IconEye size={14} />
                    View Details
                  </button>
                  <button
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-left transition-colors"
                    role="menuitem"
                    aria-label="Edit deployment"
                  >
                    <IconEdit size={14} />
                    Edit
                  </button>
                  <button
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-left transition-colors"
                    role="menuitem"
                    aria-label="Delete deployment"
                  >
                    <IconTrash size={14} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          ),
          align: "right",
        },
      ]}
      data={data}
    />
  );
}
