import { useEffect, useState } from "react";
import Header from "../UI/Header";
import { Sidebar } from "../UI/Sidebar";

export default function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Automatically collapse the sidebar on smaller screens
  useEffect(() => {
    const MOBILE_BREAKPOINT = 1024; 

    function handleResize() {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsSidebarCollapsed(isMobile);
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      />
      <Sidebar
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      />
    </div>
  );
}
