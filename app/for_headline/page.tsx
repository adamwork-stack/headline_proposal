"use client";

import Link from "next/link";
import { useState, useCallback } from "react";

const PROMPT_TEMPLATE = `AI Prompt: Generate Killer Headlines & Hooks
I'm a freelance [YOUR SERVICE] on Upwork with no reviews yet.

I need a profile headline that will grab attention when clients scroll through applications. Most freelancers just list skills like "Copywriter | Email Marketing | Sales Pages | Brand Messaging" but I want to stand out.

We want our headline and hook combos to:

1. Create curiosity, surprise, or tension

2. Speak directly to client desires or pain points

3. Avoid boring skill lists or generic statements

4. Use various attention hooks (humor, questions, stats, bold claims)

5. Make clients want to click my profile to learn more

Please create 10 different PAIRS (headline + opening hook) using different attention-grabbing techniques for each:

1. One pair using curiosity/surprise

2. One pair using humor

3. One pair using specific statistics/numbers

4. One pair using a question

5. One pair using a client testimonial format

6. One pair using a bold claim

7. One pair using a problem-solution format

8. One pair using a story hook

9. One pair using contrast/pattern interruption

10. One pair using immediacy/urgency

For each pair, make the hook continue or complement the headline without repeating the same exact approach. Keep each opening hook to 2 sentences maximum.

My ideal clients are [DESCRIBE TARGET CLIENTS] who need help with [DESCRIBE SERVICES].`;

function buildPrompt(service: string, targetClients: string, services: string): string {
  return PROMPT_TEMPLATE
    .replace("[YOUR SERVICE]", service.trim() || "[YOUR SERVICE]")
    .replace("[DESCRIBE TARGET CLIENTS]", targetClients.trim() || "[DESCRIBE TARGET CLIENTS]")
    .replace("[DESCRIBE SERVICES]", services.trim() || "[DESCRIBE SERVICES]");
}

export default function ForHeadlinePage() {
  const [service, setService] = useState("");
  const [targetClients, setTargetClients] = useState("");
  const [services, setServices] = useState("");
  const [copied, setCopied] = useState(false);

  const generatedPrompt = buildPrompt(service, targetClients, services);

  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [generatedPrompt]);

  const inputClass =
    "mt-1 block w-full rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto text-foreground">
      <Link href="/" className="text-blue-600 dark:text-blue-400 underline hover:no-underline">
        ← Home
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-foreground">
        Generate Killer Headlines & Hooks
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Fill in the fields below. The prompt will update. Copy it and paste into ChatGPT.
      </p>

      <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Your service (e.g. copywriter, email marketer)
          </label>
          <input
            id="service"
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="e.g. copywriter"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="targetClients" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Describe your target clients
          </label>
          <textarea
            id="targetClients"
            rows={3}
            value={targetClients}
            onChange={(e) => setTargetClients(e.target.value)}
            placeholder="e.g. B2B SaaS founders and marketing managers"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="services" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Describe what you help with (services)
          </label>
          <textarea
            id="services"
            rows={3}
            value={services}
            onChange={(e) => setServices(e.target.value)}
            placeholder="e.g. email sequences, landing pages, and brand messaging"
            className={inputClass}
          />
        </div>
      </form>

      <div className="mt-8">
        <div className="flex items-center justify-between gap-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Generated prompt
          </label>
          <button
            type="button"
            onClick={copyToClipboard}
            className="rounded-md bg-blue-600 dark:bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
          >
            {copied ? "Copied!" : "Copy to clipboard"}
          </button>
        </div>
        <textarea
          readOnly
          value={generatedPrompt}
          rows={24}
          className="mt-2 block w-full rounded-md border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 font-mono text-sm text-zinc-900 dark:text-zinc-100"
        />
      </div>
    </main>
  );
}
