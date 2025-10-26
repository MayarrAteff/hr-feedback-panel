import { Link, Outlet } from "@tanstack/react-router";
import { RiDashboardLine, RiMessage2Line } from "@remixicon/react";

export function Sidebar({ isSidebarCollapsed }) {
  return (
    <div className="flex flex-1 pt-16">
      <aside
        className={`fixed left-0 top-16 bottom-0 bg-white/70 backdrop-blur-xl shadow-xl transition-all duration-300 z-20 border-r border-slate-200/60
        ${isSidebarCollapsed ? "w-[70px]" : "w-[260px]"}`}
      >
        <nav className="py-8 px-3 h-full flex flex-col">
          {!isSidebarCollapsed && (
            <h2 className="text-xs font-bold text-slate-500 uppercase mb-6 px-3 tracking-wider">
              Main Menu
            </h2>
          )}
          <ul className="space-y-2 flex-1">
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 rounded-xl transition-all duration-200 group relative overflow-hidden"
                activeProps={{
                  className:
                    "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 scale-105",
                }}
              >
                <div className="relative z-10">
                  <RiDashboardLine className="w-5 h-5" />
                </div>
                {!isSidebarCollapsed && (
                  <span className="relative z-10">Dashboard</span>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity duration-200"></div>
              </Link>
            </li>
            <li>
              <Link
                to="/chat"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 rounded-xl transition-all duration-200 group relative overflow-hidden"
                activeProps={{
                  className:
                    "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 scale-105",
                }}
              >
                <div className="relative z-10">
                  <RiMessage2Line className="w-5 h-5" />
                </div>
                {!isSidebarCollapsed && (
                  <span className="relative z-10">Chat</span>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity duration-200"></div>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main
        className={`flex-1 min-h-screen transition-all duration-300 ease-in-out
        ${isSidebarCollapsed ? "ml-[70px]" : "ml-[260px]"} pt-6 px-6 pb-6`}
      >
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
