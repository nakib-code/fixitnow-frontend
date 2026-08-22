import {
  CheckCircle2,
  Clock3,
  CreditCard,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Verified Technicians",
      description:
        "Connect with verified and skilled professionals you can trust in your home.",
    },
    {
      icon: CheckCircle2,
      title: "Quality Service",
      description:
        "Get reliable, professional service with a focus on quality and customer satisfaction.",
    },
    {
      icon: Clock3,
      title: "Fast Response",
      description:
        "Book a service quickly and get connected with the right professional without the wait.",
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description:
        "Pay securely through our trusted payment system with a smooth checkout experience.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute left-1/2 top-0 size-80 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" />
            Why FixItNow?
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Home services made
            <span className="text-primary"> simple.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            From finding the right professional to making a secure payment,
            FixItNow makes the entire process simple and stress-free.
          </p>
        </div>

        {/* Features */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Number */}
                <span className="absolute right-5 top-5 text-xs font-bold text-muted-foreground/30">
                  0{index + 1}
                </span>

                {/* Icon */}
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </div>

                {/* Content */}
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className="mt-6 h-1 w-8 rounded-full bg-primary/20 transition-all duration-300 group-hover:w-14 group-hover:bg-primary" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}