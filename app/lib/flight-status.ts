/** AviationStack flight_status → Arabic label for UI and API responses. */
export const FLIGHT_STATUS_LABELS_AR: Record<string, string> = {
  scheduled: "مجدولة",
  active: "نشطة",
  landed: "هبطت",
  cancelled: "ملغاة",
  incident: "حادث",
  diverted: "محوّلة",
  delayed: "متأخرة",
};

export function getFlightStatusLabelAr(status?: string | null): string {
  if (!status) return "غير معروف";
  const trimmed = status.trim();
  return (
    FLIGHT_STATUS_LABELS_AR[trimmed.toLowerCase()] ??
    FLIGHT_STATUS_LABELS_AR[trimmed] ??
    trimmed
  );
}
