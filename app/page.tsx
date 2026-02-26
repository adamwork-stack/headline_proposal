import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-semibold">Home</h1>
      <p className="mt-2 text-zinc-600">Prompt generator for ChatGPT.</p>
      <nav className="mt-6 flex gap-4">
        <Link
          href="/for_headline"
          className="text-blue-600 underline hover:no-underline"
        >
          For Headline
        </Link>
        <Link
          href="/for_proposal"
          className="text-blue-600 underline hover:no-underline"
        >
          For Proposal
        </Link>
      </nav>
    </main>
  );
}
