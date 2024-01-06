import React from "react";
import { redirect } from "next/navigation";
import Sidebar from "../Components/Sidebar/sidebar";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { FoldersProvider } from "../Components/Sidebar/sidebarHook";
async function useAuthentication() {
  const session = await getSession();
  return true;
}

async function Layout({ children }: any) {
  const session = await getServerSession();
  if (!session) {
    redirect("/Auth/login");
  }
  return (
    <FoldersProvider>
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </FoldersProvider>
  );
}

export default Layout;
