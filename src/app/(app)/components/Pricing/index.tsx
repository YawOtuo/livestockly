import PricingCard from "./PricingCard";

function Pricing() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-5 justify-center py-24">
      <PricingCard
        type="free"
        items={["100 free records", "1 worker maximum", "Lorem", "25 AI Credits per month"]}
        price="USD 0.00"
      />
      <PricingCard
        type="premium"
        items={["all of free + ", "200 free records", "5 workers maximum", "50 AI Credits per month"]}
        price="USD 7.00"
      />
      <PricingCard
        type="pro"
        items={["all of premium + ", "unlimited number of records", "20 workers", "100 AI Credits per month"]}
        price="USD 10.00"
      />
    </div>
  );
}

export default Pricing;
