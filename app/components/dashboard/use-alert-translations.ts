"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { collectTranslatableTexts } from "@/app/lib/alert-text";
import type { FlightAlert } from "./alert-types";

type TranslateApiResponse = {
  translations?: Record<string, string>;
  error?: string;
};

export function useAlertTranslations(alerts: FlightAlert[]) {
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [translating, setTranslating] = useState(false);
  const clientCacheRef = useRef<Record<string, string>>({});
  const inFlightRef = useRef<AbortController | null>(null);

  const mergeTranslations = useCallback((incoming: Record<string, string>) => {
    if (Object.keys(incoming).length === 0) return;
    clientCacheRef.current = { ...clientCacheRef.current, ...incoming };
    setTranslations({ ...clientCacheRef.current });
  }, []);

  const translateTexts = useCallback(
    async (texts: string[], signal: AbortSignal) => {
      const missing = texts.filter((text) => !clientCacheRef.current[text]);
      if (missing.length === 0) {
        setTranslations({ ...clientCacheRef.current });
        return;
      }

      setTranslating(true);

      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ texts: missing }),
          signal,
        });

        if (!response.ok) return;

        const json = (await response.json()) as TranslateApiResponse;
        if (json.translations) {
          mergeTranslations(json.translations);
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
      } finally {
        setTranslating(false);
      }
    },
    [mergeTranslations],
  );

  useEffect(() => {
    const texts = collectTranslatableTexts(alerts);
    if (texts.length === 0) return;

    inFlightRef.current?.abort();
    const controller = new AbortController();
    inFlightRef.current = controller;

    void translateTexts(texts, controller.signal);

    return () => {
      controller.abort();
    };
  }, [alerts, translateTexts]);

  const t = useCallback(
    (original?: string | null) => {
      if (!original) return undefined;
      const key = original.trim();
      return translations[key] ?? clientCacheRef.current[key];
    },
    [translations],
  );

  return { translations, translating, t };
}
