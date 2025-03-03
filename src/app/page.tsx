// app/page.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { SVGProps } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 w-full">
      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Lockin</h1>
        <div className="space-x-4">
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">Pricing</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
        </div>
      </nav>

      <main className="w-full">
        {/* Hero Section */}
        <section className="w-full max-w-7xl mx-auto px-4 py-20 text-center space-y-8">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent max-w-4xl leading-tight">
              Craft Your Perfect Resume
              <span className="block mt-4 text-3xl text-gray-600 font-medium">
                AI-Powered Professional Resume Builder
              </span>
            </h1>

            <div className="flex justify-center gap-4 mt-8">
              <Link href="/resume">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg"
                >
                  Start Building Free
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                See Examples
              </Button>
            </div>

            {/* Resume Preview */}
            <div className="mt-16 relative group w-full max-w-4xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-30 blur transition group-hover:opacity-50"></div>
              <Card className="relative p-8 rounded-2xl shadow-xl transform transition-transform group-hover:scale-[1.02]">
                <div className="bg-gray-100 h-96 rounded-lg"></div>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">
              Why Choose Lockin?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 justify-items-center">
              {FEATURES.map((feature) => (
                <Card
                  key={feature.title}
                  className="p-6 hover:shadow-lg transition-shadow max-w-sm w-full"
                >
                  <feature.icon className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-16">
            Trusted by Professionals
          </h2>
          <div className="grid md:grid-cols-2 gap-8 justify-items-center">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.name} className="p-8 max-w-md w-full">
                <p className="text-gray-600 mb-4">
                  {'"'}
                  {testimonial.text}
                  {'"'}
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gray-100"></div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="w-full max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Ready to Land Your Dream Job?
          </h2>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 px-12 py-8 text-xl"
          >
            Create Your Resume Now
          </Button>
        </section>
      </main>

      <footer className="border-t w-full">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600">
          © {new Date().getFullYear()} Lockin. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// ... keep the same FEATURES, TESTIMONIALS, and icon components as before

const FEATURES = [
  {
    title: "AI-Powered Suggestions",
    description:
      "Get intelligent content recommendations tailored to your industry",
    icon: SparklesIcon,
  },
  {
    title: "Real-Time Preview",
    description: "See your resume come to life as you build it",
    icon: EyeIcon,
  },
  {
    title: "ATS Optimization",
    description: "Ensure your resume passes through applicant tracking systems",
    icon: ShieldCheckIcon,
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    text: "Lockin helped me create a resume that got me 3 interview offers in the first week!",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    text: "The ATS optimization feature is a game-changer. Finally landed my dream job!",
  },
];

// Icons (you can use any icon library)
function SparklesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
      />
    </svg>
  );
}

function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function ShieldCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}
