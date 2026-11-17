// Import the server action from your TMDB module
import { calculateMarathon } from "@/lib/tmdb";

// async to allow server-side data fetching
export default async function Home() {
  // Execute the marathon calculation on the server when the page loads.
  await calculateMarathon("Harry Potter");

  return (
    <main className="max-w-3xl mx-auto mt-16">
      <header>
        <div className="flex flex-row justify-center">
          <h1 className="text-6xl font-outfit font-bold text-text-main">
            Watch
          </h1>
          <h1 className="text-6xl font-outfit font-bold text-accent">Time</h1>
        </div>
      </header>

      <h2 className="text-4xl md:text-6xl mx-auto mt-36">Coming Soon 🎬</h2>
    </main>
  );
}
