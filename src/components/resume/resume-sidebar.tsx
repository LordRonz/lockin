import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, GraduationCap, Briefcase, Award } from "lucide-react"

export function ResumeSidebar() {
  return (
    <div className="w-64 border-r bg-gray-100/40 p-4 dark:bg-gray-800/40">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">Sections completed</h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">0/4</span>
          </div>
          <Progress value={0} />
        </div>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <FileText className="h-4 w-4" />
            Contact
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Briefcase className="h-4 w-4" />
            Experience
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <GraduationCap className="h-4 w-4" />
            Education
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Award className="h-4 w-4" />
            Skills
          </Button>
        </nav>
      </div>
    </div>
  )
}

