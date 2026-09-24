interface Props {
  status: string;
}

const styles = {
  REQUESTED:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",

  ACCEPTED:
    "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",

  IN_PROGRESS:
    "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",

  COMPLETED:
    "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",

  CANCELLED:
    "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export default function StatusBadge({ status }: Props) {
  const normalizedStatus = status?.toUpperCase();

  const badgeColor =
    styles[normalizedStatus as keyof typeof styles] ||
    "bg-muted text-muted-foreground";

  const label = normalizedStatus
    ? normalizedStatus.replaceAll("_", " ")
    : "UNKNOWN";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${badgeColor}`}
    >
      {label}
    </span>
  );
}