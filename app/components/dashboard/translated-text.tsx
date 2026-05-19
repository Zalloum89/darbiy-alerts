type TranslatedTextProps = {
  original?: string | null;
  translated?: string | null;
  loading?: boolean;
  fallback?: string;
  className?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
  inline?: boolean;
};

export function TranslatedText({
  original,
  translated,
  loading = false,
  fallback = "—",
  className = "",
  primaryClassName = "text-sm font-medium leading-snug text-slate-900",
  secondaryClassName = "mt-0.5 text-[11px] leading-relaxed text-slate-400",
  inline = false,
}: TranslatedTextProps) {
  const source = original?.trim() || "";
  const arabic = translated?.trim();
  const primary = arabic || (loading && source ? "…" : source || fallback);
  const showEnglish =
    Boolean(source) &&
    Boolean(arabic) &&
    arabic!.toLowerCase() !== source.toLowerCase();

  const Tag = inline ? "span" : "div";

  return (
    <Tag className={className}>
      <p className={primaryClassName} dir="rtl" lang="ar">
        {primary}
      </p>
      {showEnglish ? (
        <p className={secondaryClassName} dir="ltr" lang="en">
          {source}
        </p>
      ) : null}
    </Tag>
  );
}
