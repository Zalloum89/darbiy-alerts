import { NextResponse } from "next/server";
import { translateAlert } from "@/app/lib/deepseek";
import {
  getCachedTranslation,
  setCachedTranslation,
} from "@/app/lib/translation-cache";

const MAX_BATCH = 40;
const CONCURRENCY = 4;

type TranslateRequestBody = {
  texts?: string[];
};

async function translateWithConcurrency(
  texts: string[],
): Promise<Record<string, string>> {
  const results: Record<string, string> = {};
  let index = 0;

  async function worker() {
    while (index < texts.length) {
      const current = texts[index];
      index += 1;

      const cached = getCachedTranslation(current);
      if (cached) {
        results[current] = cached;
        continue;
      }

      const translated = (await translateAlert(current))?.trim() || current;
      setCachedTranslation(current, translated);
      results[current] = translated;
    }
  }

  const workers = Array.from(
    { length: Math.min(CONCURRENCY, texts.length) },
    () => worker(),
  );
  await Promise.all(workers);

  return results;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TranslateRequestBody;
    const incoming = Array.isArray(body.texts) ? body.texts : [];

    const unique = [
      ...new Set(
        incoming
          .filter((text): text is string => typeof text === "string")
          .map((text) => text.trim())
          .filter((text) => text.length > 0),
      ),
    ].slice(0, MAX_BATCH);

    const translations: Record<string, string> = {};
    const pending: string[] = [];

    for (const text of unique) {
      const cached = getCachedTranslation(text);
      if (cached) {
        translations[text] = cached;
      } else {
        pending.push(text);
      }
    }

    if (pending.length > 0) {
      const fresh = await translateWithConcurrency(pending);
      Object.assign(translations, fresh);
    }

    return NextResponse.json({ translations });
  } catch (error) {
    console.error("Translate API error:", error);
    return NextResponse.json(
      { error: "فشلت الترجمة", translations: {} },
      { status: 500 },
    );
  }
}
