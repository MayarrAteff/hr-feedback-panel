import { useState } from "react";
import Header from "../UI/Header";
import { Sidebar } from "../UI/Sidebar";

export default function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      />
      <Sidebar isSidebarCollapsed={isSidebarCollapsed} />
    </div>
  );
}
