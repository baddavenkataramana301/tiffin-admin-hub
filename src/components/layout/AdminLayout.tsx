import { useState } from "react";
import { Outlet } from "react-router-dom";
import { TopNav } from "./TopNav";
import { SideNav } from "./SideNav";

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background w-full">
      <TopNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex pt-16 w-full">
        <SideNav isOpen={sidebarOpen} />
        <main 
          className={`flex-1 transition-all duration-300 ease-in-out ${
            sidebarOpen ? "ml-64" : "ml-0"
          } p-6`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
