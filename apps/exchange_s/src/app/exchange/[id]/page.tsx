import MSportsMarket from "@exchange_s/components/m-view/m-sports-market";

export default async function ExchangeIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ await params
  const { id } = await params;

  console.log("Exchange ID:", id);

  return (
    <div>
      <MSportsMarket sportName={id} />
    </div>
  );
}
