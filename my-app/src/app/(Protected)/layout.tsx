import React from "react";
import { redirect } from "next/navigation";
import Sidebar from "../Components/sidebar";
function useAuthentication() {
  return true;
}

const Layout: React.FC = ({ children }: any) => {
  const isAuthenticated = useAuthentication();
  if (isAuthenticated == false) {
    redirect("/login");
  }
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
