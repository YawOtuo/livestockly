type PointItemProps = {
  label: string;
  description: string;
};

const PointItem = ({ label, description }: PointItemProps) => {
  return (
    <div className="border-2  p-4 rounded-lg flex flex-col">
      <h3 className="font-semibold text-lg">{label}</h3>
      <p>{description}</p>
    </div>
  );
};

function PilotWhyParticipate() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-primary">Why Participate?</h2>
      <div className="flex flex-col gap-4">
        <PointItem
          label="Early Access"
          description="Be among the first to experience the benefits of Livestockly AI's innovative features."
        />
        <PointItem
          label="Direct Impact"
          description="Contribute to shaping the future of livestock management through your feedback and insights."
        />
        <PointItem
          label="Incentives"
          description="Get one year free use of our platform after we launch"
        />
      </div>
    </div>
  );
}

export default PilotWhyParticipate;
