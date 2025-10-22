"use client";

import { useRef, useState } from 'react';

interface FileSystemItem {
  name: string;
  type: 'file' | 'folder';
  children?: FileSystemItem[];
  language?: string;
  open?: boolean;
}

// Sample file structure for a Next.js project
const initialFileSystem: FileSystemItem[] = [
  {
    name: 'src',
    type: 'folder',
    open: true,
    children: [
      {
        name: 'components',
        type: 'folder',
        open: true,
        children: [
          {
            name: 'common',
            type: 'folder',
            children: [
              { name: 'Button.tsx', type: 'file', language: 'tsx' },
              { name: 'Card.tsx', type: 'file', language: 'tsx' },
              { name: 'FileTree.tsx', type: 'file', language: 'tsx' },
              { name: 'LighthouseMetrics.tsx', type: 'file', language: 'tsx' },
            ]
          },
          {
            name: 'layout',
            type: 'folder',
            children: [
              { name: 'Footer.tsx', type: 'file', language: 'tsx' },
              { name: 'Header.tsx', type: 'file', language: 'tsx' },
              { name: 'Sidebar.tsx', type: 'file', language: 'tsx' },
            ]
          },
          {
            name: 'pages',
            type: 'folder',
            children: [
              { name: 'home', type: 'folder', children: [
                { name: 'HomeSection1.tsx', type: 'file', language: 'tsx' },
                { name: 'HomeSection2.tsx', type: 'file', language: 'tsx' },
                { name: 'HomeSection3.tsx', type: 'file', language: 'tsx' },
              ]},
              { name: 'about', type: 'folder', children: [
                { name: 'AboutHero.tsx', type: 'file', language: 'tsx' },
                { name: 'TeamSection.tsx', type: 'file', language: 'tsx' },
              ]},
            ]
          }
        ]
      },
      {
        name: 'lib',
        type: 'folder',
        children: [
          { name: 'utils.ts', type: 'file', language: 'ts' },
          { name: 'constants.ts', type: 'file', language: 'ts' },
        ]
      },
      {
        name: 'app',
        type: 'folder',
        open: true,
        children: [
          { name: 'layout.tsx', type: 'file', language: 'tsx' },
          { name: 'page.tsx', type: 'file', language: 'tsx' },
          {
            name: 'about',
            type: 'folder',
            children: [
              { name: 'page.tsx', type: 'file', language: 'tsx' }
            ]
          },
          {
            name: 'blog',
            type: 'folder',
            children: [
              { name: 'page.tsx', type: 'file', language: 'tsx' },
              { 
                name: '[slug]', 
                type: 'folder',
                children: [
                  { name: 'page.tsx', type: 'file', language: 'tsx' }
                ]
              }
            ]
          }
        ]
      },
    ]
  },
  {
    name: 'public',
    type: 'folder',
    children: [
      { name: 'assets', type: 'folder', children: [
        { name: 'images', type: 'folder', children: [
          { name: 'hero.jpg', type: 'file', language: 'image' },
          { name: 'logo.svg', type: 'file', language: 'svg' },
        ]},
      ]},
      { name: 'favicon.ico', type: 'file', language: 'icon' }
    ]
  },
  { name: 'package.json', type: 'file', language: 'json' },
  { name: 'tsconfig.json', type: 'file', language: 'json' },
  { name: 'next.config.js', type: 'file', language: 'js' },
  { name: 'tailwind.config.js', type: 'file', language: 'js' },
  { name: '.gitignore', type: 'file', language: 'git' }
];

function FileIcon({ language }: { language?: string }) {
  // Different file type icons based on language
  const getFileIcon = () => {
    switch (language) {
      case 'tsx':
      case 'ts':
        return (
          <svg className="w-3.5 h-3.5 text-neutral-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
      case 'js':
        return (
          <svg className="w-3.5 h-3.5 text-neutral-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'json':
        return (
          <svg className="w-3.5 h-3.5 text-neutral-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z" />
          </svg>
        );
      case 'image':
      case 'svg':
      case 'icon':
        return (
          <svg className="w-3.5 h-3.5 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'git':
        return (
          <svg className="w-3.5 h-3.5 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-3.5 h-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  return getFileIcon();
}

function FolderIcon({ isOpen }: { isOpen: boolean }) {
  return isOpen ? (
    <svg className="w-3.5 h-3.5 text-neutral-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
    </svg>
  ) : (
    <svg className="w-3.5 h-3.5 text-neutral-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}

function FileTreeItem({ item, depth = 0 }: { item: FileSystemItem, depth?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="select-none" ref={containerRef}>
      <div
        className={`flex items-center py-0.5 px-1 rounded-sm ${item.type === 'folder' ? '' : 'cursor-default'}`}
        style={{ paddingLeft: `${depth * 10}px` }}
      >
        <div className="w-4 h-4 flex items-center justify-center mr-1">
          {item.type === 'folder' ? (
            <FolderIcon isOpen={!!item.open} />
          ) : (
            <FileIcon language={item.language} />
          )}
        </div>
        <span className={`text-xs ${item.type === 'folder' ? 'font-medium text-neutral-700 dark:text-neutral-300' : 'text-neutral-600 dark:text-neutral-400'}`}>
          {item.name}
        </span>
      </div>

      {item.type === 'folder' && item.open && item.children && (
        <div className="transition-all duration-200 ease-in-out">
          {item.children.map((child, index) => (
            <FileTreeItem key={`${child.name}-${index}`} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileTree() {
  const [fileSystem,] = useState(initialFileSystem);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-2 sm:mb-3">
        <div className="p-1 bg-neutral-200 dark:bg-neutral-700 rounded-lg mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-neutral-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
          </svg>
        </div>
        <h3 className="text-sm sm:text-base font-semibold text-[var(--foreground)]">Ideal Project Structure</h3>
      </div>

      <div className="flex-1 bg-white/90 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700/50 flex flex-col max-h-[180px] sm:max-h-[250px] h-[180px] sm:h-[250px] overflow-hidden">
        {/* Sticky header */}
        <div className="sticky top-0 z-10 p-1.5 sm:p-2 bg-neutral-100/95 dark:bg-neutral-800/95 border-b border-neutral-200/40 dark:border-neutral-700/40 mb-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex gap-1 mr-2 sm:gap-1.5 sm:mr-3">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500"></div>
              </div>
              <span className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400">Explorer</span>
            </div>
            <div className="flex text-[11px] sm:text-xs text-neutral-500">
              <span>PROJECT_01</span>
            </div>
          </div>
        </div>

        {/* Scrollable content area */}
        <div
          ref={scrollContainerRef}
          className="flex-1 p-1.5 min-h-40 sm:p-2 pt-0 overflow-y-auto custom-scrollbar"
        >
          <div className="mt-1 sm:mt-2">
            {fileSystem.map((item, index) => (
              <FileTreeItem key={`${item.name}-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-1 sm:mt-2 text-[9px] sm:text-[10px] text-neutral-500 flex items-center justify-between">
        <span>Next.js App</span>
        <span className="text-neutral-500 dark:text-neutral-400">Optimized for Performance</span>
      </div>

      {/* Custom scrollbar colors for light/dark mode */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(229, 231, 235, 0.2);
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 31, 31, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.4);
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 100, 100, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 100, 100, 0.7);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.4) rgba(229, 231, 235, 0.2);
        }
        .dark .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(100, 100, 100, 0.4) rgba(31, 31, 31, 0.2);
        }
      `}</style>
    </div>
  );
}
