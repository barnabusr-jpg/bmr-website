import React, { ReactNode } from 'react';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T, index: number) => ReactNode);
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: (item: T, index: number) => string;
}

// Helper function to safely convert any value to a ReactNode
const toReactNode = (value: unknown): ReactNode => {
  // null and undefined are valid ReactNodes
  if (value === null || value === undefined) {
    return value;
  }
  
  // If it's a primitive type, convert to string
  if (
    typeof value === 'string' || 
    typeof value === 'number' || 
    typeof value === 'boolean' ||
    typeof value === 'bigint'
  ) {
    return String(value);
  }
  
  // If it's already a valid ReactNode (like a JSX element), return it
  // This check isn't perfect but handles common cases
  if (
    React.isValidElement(value) || 
    Array.isArray(value) ||
    typeof value === 'function'
  ) {
    return value as ReactNode;
  }
  
  // For objects, convert to string representation
  return String(value);
};

export default function Table<T extends object>({ 
  columns, 
  data, 
  className = '', 
  headerClassName = '',
  bodyClassName = '',
  rowClassName = () => '' 
}: TableProps<T>) {
  return (
    <div className={`bg-white dark:bg-neutral-900 rounded-sm border border-neutral-200 dark:border-neutral-800 overflow-visible ${className}`}>
      <div className="overflow-visible">
        <table className="w-full border-collapse">
          <thead>
            <tr className={`border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 ${headerClassName}`}>
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className={`p-4 font-semibold text-neutral-700 dark:text-neutral-300 text-xs ${column.align === 'right' ? 'text-right' : column.align === 'center' ? 'text-center' : 'text-left'}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`text-xs ${bodyClassName}`}>
            {data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors duration-200 ${rowClassName(item, rowIndex)}`}
              >
                {columns.map((column, colIndex) => {
                  // Get the cell value
                  const rawValue = typeof column.accessor === 'function' 
                    ? column.accessor(item, rowIndex)
                    : item[column.accessor as keyof T];
                  
                  // Convert to a safe ReactNode
                  const cellValue = toReactNode(rawValue);
                  
                  return (
                    <td 
                      key={colIndex} 
                      className={`p-4 text-neutral-700 dark:text-neutral-300 ${column.align === 'right' ? 'text-right' : column.align === 'center' ? 'text-center' : 'text-left'}`}
                    >
                      {cellValue}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
