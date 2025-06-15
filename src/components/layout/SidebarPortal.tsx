import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Book, Code2, Bot, Video, Home } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEnrollment } from "@/hooks/useEnrollment";

const sidebarLinks = [
  { name: "Dashboard", path: "/dashboard", icon: <Home className="w-5 h-5" /> },
  { name: "Curriculum", path: "/curriculum", icon: <Book className="w-5 h-5" /> },
  { name: "Code Editor", path: "/editor", icon: <Code2 className="w-5 h-5" /> },
  { name: "AI Chat", path: "/ai-chat", icon: <Bot className="w-5 h-5" /> },
  { name: "Videos", path: "/videos", icon: <Video className="w-5 h-5" /> }
];

const SidebarPortal = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { enrolled, isLoading } = useEnrollment();

  // Only show sidebar for logged-in enrolled users
  if (!user || !enrolled) return null;

  return (
    <aside className="hidden md:flex flex-col bg-accent/50 border-r border-border w-56 pt-24 fixed top-0 left-0 h-full z-40">
      <div className="flex flex-col gap-2 px-4">
        {sidebarLinks.map((link) => (
          <Link
            to={link.path}
            key={link.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
              location.pathname.startsWith(link.path)
                ? "bg-primary/10 text-primary font-medium"
                : "text-foreground/80 hover:bg-accent"
            }`}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default SidebarPortal;
