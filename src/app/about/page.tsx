'use client'; // Can be a client component if we add interactivity, or server if static

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  const techStack = [
    { name: "Next.js", description: "React framework for server-rendered applications." },
    { name: "React", description: "JavaScript library for building user interfaces." },
    { name: "TypeScript", description: "Typed superset of JavaScript." },
    { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development." },
    { name: "shadcn/ui", description: "Reusable UI components built with Radix UI and Tailwind CSS." },
    { name: "Lucide React", description: "Simply beautiful open-source icons." },
    { name: "Yelp Fusion API", description: "External API for business, review, and photo data." },
    { name: "Axios", description: "Promise-based HTTP client for the browser and Node.js (used in API routes)." },
    { name: "Fetch API", description: "Modern JavaScript API for making network requests (used in client components)." },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">About This FoodApp</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Created By</h2>
            <p className="text-xl text-muted-foreground">Stanley Luong</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">Tech Stack</h2>
            <ul className="space-y-4">
              {techStack.map((tech, index) => (
                <li key={index} className="p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium text-primary">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="text-center mt-10">
            <p className="text-muted-foreground">
              This application is a project to demonstrate building a Yelp-like interface, 
              fetching and displaying data from the Yelp Fusion API.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
} 