type Props = {
  label: string;
  content: string;
};

const LiItem = ({ label, content }: Props) => {
  return (
    <div className="border-2  p-5 rounded-2xl flex items-start justify-center flex-col gap-2 bg-green2">
      <p className="font-semibold">{label}</p>
      <p>{content}</p>
    </div>
  );
};

function PilotWhatWeOffer() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className=" text-primary ">
          What We Offer
        </h2>
        <p>
          By participating in our pilot program, you’ll gain access to a suite
          of powerful features that include:
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <LiItem
          label="Livestock Health Monitoring via Image Recognition:"
          content="Utilize cutting-edge image recognition technology to monitor the health of your livestock in real-time, ensuring early detection of potential health issues."
        />
        <LiItem
          label="Predictive Analytics for Animal Growth and Health Risks:"
          content="Leverage data-driven insights to predict growth patterns and identify potential health risks before they become critical."
        />
        <LiItem
          label="Smart Vaccination Scheduling and Reminders:"
          content="Streamline your vaccination process with automated scheduling and reminders, ensuring your livestock receive timely care."
        />
        <LiItem
          label="AI-Powered Chatbots for 24/7 Livestock Care Advice:"
          content="Access expert advice at any time with our AI-powered chatbots, providing you with essential information and support whenever you need it."
        />
        <LiItem
          label="Disease Outbreak Prediction to Provide Regional Alerts:"
          content="Stay ahead of potential disease outbreaks with predictive alerts tailored to your region, helping you protect your livestock and investment."
        />
      </div>
    </div>
  );
}

export default PilotWhatWeOffer;
