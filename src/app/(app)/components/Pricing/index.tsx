import { MdInfoOutline } from "react-icons/md";
import PricingCard from "./PricingCard";

function Pricing() {
  return (
    <div className="flex flex-col gap-5 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-5 justify-center ">
        <PricingCard
          label="Free (Basic)"
          summary="Perfect for small farms or individuals looking to get started."
          type="free"
          items={[
            "100 free livestock records",
            "1 worker",
            "25 AI Credits per month",
            "Livestock health tracking",
            "Basic vaccination scheduling",
            "Access to AI-powered chatbots",
          ]}
          price="USD 0.00"
        />
        <PricingCard
          label="Starter"
          summary="Great for small teams starting out with more advanced features."
          type="starter"
          items={[
            "All Free features +",
            "500 livestock records",
            "3 workers",
            "35 AI Credits per month",
            "Team collaboration tools",
          ]}
          price="USD 4.99"
        />
        <PricingCard
          label="Premium"
          summary="Ideal for growing farms with a need for advanced analytics."
          type="premium"
          items={[
            "All Starter features +",
            "2000 livestock records",
            "5 workers",
            "50 AI Credits per month",
            "Improved disease outbreak alerts",
            "Collaborative team management",
          ]}
          price="USD 7.00"
        />
        <PricingCard
          label="Pro"
          summary="Built for large-scale operations with premium features."
          type="pro"
          items={[
            "All Premium features +",
            "Unlimited livestock records",
            "20 workers",
            "100 AI Credits per month",
            "Regional disease outbreak prediction",
            "Full team collaboration and task assignment",
          ]}
          price="USD 10.00"
        />
        <PricingCard
          label="Enterprise"
          summary="Comprehensive package tailored for large businesses with high demands."
          type="enterprise"
          items={[
            "All Pro features +",
            "Custom livestock records",
            "Unlimited workers",
            "Custom AI Credits per month",
            "Dedicated account management",
            "Priority support",
            "Custom analytics and reporting",
            "Bespoke solutions for your farm",
          ]}
          price="Custom Pricing"
        />
      </div>
      <div className="bg-green2 flex items-center gap-3 w-fit rounded-2xl px-5 py-3">
        <MdInfoOutline />

        <p className="text-gray-500">Pricing varies per location. Prices are usually lower per continent</p>
      </div>
    </div>
  );
}

export default Pricing;
