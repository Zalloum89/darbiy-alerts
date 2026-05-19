import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav
      className={className}
      aria-label="مسار التنقل"
    >
      <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.href}-${index}`} className="flex items-center gap-1">
              {index > 0 ? (
                <ChevronLeft
                  className="h-3.5 w-3.5 shrink-0 text-slate-300 rtl:rotate-180"
                  aria-hidden
                />
              ) : null}
              {isLast ? (
                <span
                  className="truncate font-medium text-slate-700"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="truncate transition-colors duration-200 hover:text-teal-700"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function breadcrumbJsonLd(items: BreadcrumbItem[], baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${baseUrl}${item.href}`,
    })),
  };
}
