import {
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiUser3Line,
} from "@remixicon/react";

interface HeaderProps {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
}

export default function Header({
  isSidebarCollapsed,
  setIsSidebarCollapsed,
}: HeaderProps) {
  return (
    <header className="bg-red/80 backdrop-blur-md shadow-sm h-16 fixed w-full top-0 z-30 border-b border-slate-200/60">
      <div className="flex items-center justify-between px-6 h-full">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Toggle sidebar"
          >
            {isSidebarCollapsed ? (
              <RiMenuUnfoldLine className="w-5 h-5 text-slate-600" />
            ) : (
              <RiMenuFoldLine className="w-5 h-5 text-slate-600" />
            )}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold text-lg">HR</span>
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800">
                  HR Connect
                </span>
                <span className="text-xs text-slate-500">Admin Panel</span>
              </div>
            )}
          </div>
        </div>

        <h1 className="text-sm font-bold text-slate-600 hidden md:block">
          Employee Feedback Management
        </h1>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-800 to-blue-400 flex items-center justify-center ml-2 cursor-pointer hover:scale-105 transition-transform shadow-md">
            <RiUser3Line className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
