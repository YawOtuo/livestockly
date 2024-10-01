import Navbar from "@/app/(app)/components/Navbar";
import PilotHero from "./components/PilotHero";
import PilotSummary from "./components/PilotSummary";
import PilotWhatWeOffer from "./components/PilotWhatWeOffer";
import PilotWhyParticipate from "./components/PilotWhyParticipate";
import PilotGetInvolved from "./components/PilotGetInvolved";

function Page() {
  return (
    <div className="max-w-[1728px]">
      <Navbar />
      <PilotHero />

      <div className="px-5 lg:px-10 py-10 lg:py-24 flex flex-col gap-10 lg:gap-24">
        <PilotSummary />

        <PilotWhatWeOffer />
        <PilotWhyParticipate />
        <PilotGetInvolved />
      </div>
    </div>
  );
}

export default Page;
