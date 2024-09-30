import InfoCard from "./InfoCard";

function LivestockAI() {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center bg-green2 px-5 lg:px-20 gap-5 py-24">
      <h1 className="text-3xl lg:text-5xl font-semibold">
        Introducing <span className="text-primary font-bold"> livestockAI</span>
      </h1>
      <p>
        StockWise AI: Smarter Livestock Management At the heart of our platform,
        StockWise AI leverages advanced machine learning and real-time data
        analytics to revolutionize livestock management.
      </p>{" "}
      <p>
        With its ability to monitor herd health, optimize feeding schedules, and
        predict trends, StockWise AI empowers farmers and ranchers with
        actionable insights to enhance productivity and profitability.{" "}
      </p>
      <p>
        Designed to simplify decision-making, StockWise AI helps you make
        smarter, data-driven choices to ensure the well-being and growth of your
        livestock—whether you're managing a small farm or a large-scale
        operation.
      </p>
      <div className="flex flex-col justify-start gap-24 py-24 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-20 justify-center ">
          <InfoCard
            type="Livestock health monitoring via image recognition."
            about="StockWise AI utilizes advanced image recognition technology to monitor livestock health in real-time. By analyzing visual data, the platform can detect signs of illness, injury, or distress, allowing farmers to take immediate action and ensure the well-being of their animals."
            items={[
              "Early Detection: Identify health issues before they escalate, minimizing losses.",
              "Visual Insights: Gain a comprehensive view of livestock conditions through visual data analysis.",
              "Automated Monitoring: Reduce manual checks, saving time and labor costs.",
            ]}
          />
          <InfoCard
            type="Predictive analytics for animal growth and health risks."
            about="Summary: Our predictive analytics engine analyzes historical and real-time data to forecast animal growth patterns and potential health risks. This enables farmers to make proactive management decisions that optimize productivity and ensure the health of their livestock."
            items={[
              "Informed Decision-Making: Base your management strategies on data-driven insights.",
              "Growth Optimization: Enhance feeding and breeding strategies tailored to individual animal needs.",
              "5 workers maximum",
              "Risk Mitigation: Anticipate health risks, allowing for timely interventions.",
            ]}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <InfoCard
            type="Smart vaccination scheduling and reminders."
            about="Summary: StockWise AI streamlines the vaccination process by providing intelligent scheduling and automated reminders. This ensures that livestock receive their vaccinations on time, improving herd immunity and overall health."
            items={[
              "Compliance Assurance: Stay compliant with vaccination protocols easily.",
              "Reduced Missed Doses: Minimize the risk of missing important vaccinations.",
              "Customized Schedules: Tailor vaccination plans based on specific herd needs.",
            ]}
          />
          <InfoCard
            type="AI-powered chatbots for 24/7 livestock care advice."
            about="Summary: Our AI-powered chatbots offer round-the-clock assistance, providing expert advice and support for livestock care. Farmers can access reliable information at any time, improving their ability to manage and care for their animals effectively."
            items={[
              "Immediate Access: Get answers to livestock care questions anytime, day or night.",
              "Expert Guidance: Benefit from advice based on best practices in livestock management.",
              "Enhanced Productivity: Spend less time searching for information and more time on your farm.",
            ]}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <InfoCard
            type="Disease outbreak prediction to provide regional alerts"
            about="Summary: StockWise AI employs predictive analytics to forecast potential disease outbreaks within specific regions. By providing timely alerts, farmers can implement preventive measures, safeguarding their livestock and contributing to community health."
            items={[
              "Proactive Prevention: Stay ahead of disease threats with early warnings.",
              "Community Health Support: Help protect local livestock populations through timely information.",
              "Resource Optimization: Allocate resources effectively in response to potential outbreaks.",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default LivestockAI;
