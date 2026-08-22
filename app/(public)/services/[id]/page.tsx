import ServiceDetails from "@/app/(public)/services/[id]/_components/ServiceDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ServiceDetails id={id} />;
}
