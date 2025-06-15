
import React from "react";
import { Helmet } from "react-helmet-async";
import SidebarPortal from "@/components/layout/SidebarPortal";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Helmet>
        <title>Dashboard | SGK14 Student Portal</title>
      </Helmet>
      <SidebarPortal />
      <main className="flex-1 p-8 pt-20 md:pt-24">
        <h1 className="text-2xl font-bold mb-4">Welcome to your SGK14 Dashboard!</h1>
        <p>
          Here you’ll find access to the full curriculum, code editor, AI Chat, and your progress.
        </p>
      </main>
    </div>
  );
};

export default Dashboard;
