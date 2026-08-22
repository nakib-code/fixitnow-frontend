import ServicesPageContent from "@/components/services/ServicesPageContent";

interface ServicesPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}

export default async function ServicesPage({
  searchParams,
}: ServicesPageProps) {
  const params = await searchParams;

  return (
    <ServicesPageContent
      search={params.search ?? ""}
      category={params.category ?? ""}
    />
  );
}