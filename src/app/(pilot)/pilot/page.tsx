import PilotGetInvolved from "./components/PilotGetInvolved";
import PilotHero from "./components/PilotHero";
import PilotSummary from "./components/PilotSummary";
import PilotWhatWeOffer from "./components/PilotWhatWeOffer";
import PilotWhyParticipate from "./components/PilotWhyParticipate";

function Page() {
  return (
    <div className="max-w-[1728px]">
      <PilotHero />

      <div className="px-5 lg:px-10 py-5 lg:py-24 flex flex-col gap-5 lg:gap-24">
        <PilotSummary />

        <PilotWhatWeOffer />
        <PilotWhyParticipate />
        <PilotGetInvolved />
      </div>
    </div>
  );
}

export default Page;
