import React from "react";
import { redirect } from "next/navigation";

function useAuthentication() {
  return true;
}

const Layout: React.FC = ({ children }) => {
  const isAuthenticated = useAuthentication();

  if (isAuthenticated == false) {
    redirect("/login");
  }
  return <div>{children}</div>;
};

export default Layout;
