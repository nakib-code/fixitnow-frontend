export default function CustomerDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Customer Dashboard
        </h1>

        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Manage your services, bookings and profile.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Bookings */}
        <div className="app-card border border-border bg-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
          <h2 className="text-sm font-medium text-muted-foreground">
            Total Bookings
          </h2>

          <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">
            0
          </p>
        </div>

        {/* Completed Services */}
        <div className="app-card border border-border bg-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
          <h2 className="text-sm font-medium text-muted-foreground">
            Completed Services
          </h2>

          <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">
            0
          </p>
        </div>

        {/* Reviews */}
        <div className="app-card border border-border bg-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
          <h2 className="text-sm font-medium text-muted-foreground">
            Reviews
          </h2>

          <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">
            0
          </p>
        </div>
      </div>
    </div>
  );
}