import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: number | string;
  icon: ReactNode;
};

const DashboardCard = ({
  title,
  value,
  icon,
}: DashboardCardProps) => {
  return (
    <div className="app-card group border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 sm:p-6">
      {/* Top Content */}
      <div className="flex items-start justify-between gap-4">
        {/* Content */}
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-2 truncate text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {value}
          </h2>

          <p className="mt-2 text-xs text-muted-foreground">
            Overview
          </p>
        </div>

        {/* Icon */}
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground sm:size-12">
          {icon}
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="text-xs font-medium text-muted-foreground">
          Platform statistics
        </span>

        <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
    </div>
  );
};

export default DashboardCard;