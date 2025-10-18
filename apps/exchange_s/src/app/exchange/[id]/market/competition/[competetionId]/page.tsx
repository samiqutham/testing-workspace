import MCompetition from "@exchange_s/components/m-view/m-competition";

interface CompetitionPageProps {
  params: {
    competetionId: string;
  };
}

const CompetitionPage = async ({
  params,
}: {
  params: Promise<{ competetionId: string; id: string }>;
}) => {
  const param = await params;
  return (
    <div>
      <MCompetition id={param.competetionId} sportName={param.id} />
    </div>
  );
};

export default CompetitionPage;
