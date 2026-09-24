interface Props {
  status?: string | null;
}

export default function PaymentBadge({ status }: Props) {
  const normalizedStatus = status?.toUpperCase();

  if (!normalizedStatus) {
    return (
      <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
        Unpaid
      </span>
    );
  }

  const isPaid = normalizedStatus === "PAID";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        isPaid
          ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
      }`}
    >
      {normalizedStatus}
    </span>
  );
}