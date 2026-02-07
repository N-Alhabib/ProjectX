import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start gap-4 bg-white px-8 py-10 text-black">
      <h1 className="text-2xl font-semibold">Challenge Deck (Setup)</h1>
      <p>Setup-only scaffolding is in place.</p>
      <Link className="text-blue-600 underline" href="/health">
        Go to /health
      </Link>
    </main>
  );
}
