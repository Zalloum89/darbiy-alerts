/** Arabic relative time e.g. "قبل دقيقة", "قبل 5 دقائق" */
export function formatRelativeTimeAr(
  iso: string | undefined,
  nowMs: number = Date.now(),
): string | null {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return null;

  const diffSec = Math.max(0, Math.floor((nowMs - then) / 1000));

  if (diffSec < 45) return "الآن";
  if (diffSec < 90) return "قبل دقيقة";

  const minutes = Math.floor(diffSec / 60);
  if (minutes < 60) {
    return minutes === 2 ? "قبل دقيقتين" : `قبل ${toArDigits(minutes)} دقائق`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return hours === 1 ? "قبل ساعة" : hours === 2 ? "قبل ساعتين" : `قبل ${toArDigits(hours)} ساعات`;
  }

  const days = Math.floor(hours / 24);
  return days === 1 ? "قبل يوم" : `قبل ${toArDigits(days)} أيام`;
}

function toArDigits(value: number): string {
  return value.toLocaleString("ar-SA");
}
