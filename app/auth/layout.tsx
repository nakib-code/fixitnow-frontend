import Logo from "@/components/shared/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      {/* Right Side */}
      <section className="flex min-h-screen items-center justify-center bg-background px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </section>
    </main>
  );
}