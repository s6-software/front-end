import React from "react";
import { redirect } from "next/navigation";
import Sidebar from "../Components/Sidebar/sidebar";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
async function useAuthentication() {
  const session = await getSession();
  return true;
}

async function Layout({ children }: any) {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }
  return <div>{children}</div>;
}

export default Layout;
