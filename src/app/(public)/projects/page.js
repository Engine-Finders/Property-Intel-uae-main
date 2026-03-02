"use client";

import { useEffect } from "react";
import { getProjects } from "@/app/lib/projects/GetActions";

export default function ProjectsPage() {
  useEffect(() => {
    getProjects().then((data) => {
      console.log("Projects API data:", data);
    });
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-xl font-bold">Projects</h1>
      <p className="text-sm text-zinc-500 mt-2">
        Check the browser console (F12 → Console) for API data.
      </p>
    </div>
  );
}
