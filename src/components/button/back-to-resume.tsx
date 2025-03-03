import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackToResume() {
  return (
    <Link
      href="/resume"
      className="flex items-center gap-2 text-3xl font-semibold text-black hover:opacity-80 transition"
    >
      <ArrowLeft size={32} strokeWidth={2} />
      <span>Main Resume</span>
    </Link>
  );
}
