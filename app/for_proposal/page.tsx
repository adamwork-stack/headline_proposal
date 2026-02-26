"use client";

import Link from "next/link";
import { useState, useCallback } from "react";

const PROMPT_TEMPLATE = `AI Prompt: Generate Client-Specific Proposal Hooks
I'm applying for this Upwork job:

[PASTE FULL JOB DESCRIPTION]

As a beginner with no reviews, I need an attention-grabbing opening for my proposal that will stand out in a sea of generic applications. The client will see the first 1-2 sentences in their application list before deciding whether to open my full proposal.

Please write 10 different powerful opening hooks (2-3 sentences each) that:

1. Immediately grab attention with pattern interruption

2. Speak to the client's DEEPER desires (the REAL desires hiding beneath the task)

3. Address potential concerns/resistance they might have

4. Include one colorful emoji near the beginning (for visual pattern interruption)

5. Are personalized to this specific job

6. Avoid generic greetings like "Hello" or "Thanks for posting"

7. Use various hook techniques (curiosity, stats, questions, bold claims, etc.)

8. Make the client want to click "read more"

9. Make every word count – no wasted space or fluff

Each opening should be unique and compelling, focusing on different aspects of what the client REALLY wants from this project.`;

function buildPrompt(jobDescription: string): string {
  const value = jobDescription.trim() || "[PASTE FULL JOB DESCRIPTION]";
  return PROMPT_TEMPLATE.replace("[PASTE FULL JOB DESCRIPTION]", value);
}

export default function ForProposalPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [copied, setCopied] = useState(false);

  const generatedPrompt = buildPrompt(jobDescription);

  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [generatedPrompt]);

  const textareaClass =
    "mt-1 block w-full rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto text-foreground">
      <Link href="/" className="text-blue-600 dark:text-blue-400 underline hover:no-underline">
        ← Home
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-foreground">
        Generate Client-Specific Proposal Hooks
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Paste the full Upwork job description below. The prompt will update. Copy it and paste into ChatGPT.
      </p>

      <div className="mt-8">
        <label htmlFor="jobDescription" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Job description
        </label>
        <textarea
          id="jobDescription"
          rows={12}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job post here..."
          className={textareaClass}
        />
      </div>

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
          rows={28}
          className="mt-2 block w-full rounded-md border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 font-mono text-sm text-zinc-900 dark:text-zinc-100"
        />
      </div>
    </main>
  );
}
