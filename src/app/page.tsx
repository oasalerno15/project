import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-light text-white tracking-tight">
          Lumina Interactive List
        </h1>
        <p className="text-white/60 max-w-md mx-auto">
          A stunning WebGL-powered image slider with glass morphism effects and smooth GSAP animations.
        </p>
        <Link
          href="/demo"
          className="inline-block px-8 py-3 bg-[var(--color-accent)] text-black font-medium rounded-full hover:opacity-90 transition-opacity"
        >
          View Demo →
        </Link>
      </div>
    </main>
  );
}
