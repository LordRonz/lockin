import { Button } from "@/components/ui/button";
import { Download, LayoutTemplate, Settings } from "lucide-react";

export function ResumeHeader() {
  return (
    <header className="sticky top-0 bg-white shadow flex items-center justify-between border-b px-6 py-3">
      <h1 className="text-2xl font-semibold">My Resume</h1>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <LayoutTemplate className="mr-2 h-4 w-4" />
          Templates
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Manage Sections
        </Button>
        <Button size="sm">
          <Download className="mr-2 h-4 w-4" />
          Download Resume
        </Button>
      </div>
    </header>
  );
}
