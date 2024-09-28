import PricingCard from "./PricingCard";

function Pricing() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-5 justify-center">
      <PricingCard
        type="free"
        items={["100 free records", "Lorem", "Lorem"]}
        price="USD 5.00"
      />
      <PricingCard
        type="premium"
        items={["all of free + ", "200 free records", "Lorem"]}
        price="USD 7.00"
      />
      <PricingCard
        type="pro"
        items={["all of premium + ", "unlimited number of records", "Lorem"]}
        price="USD 10.00"
      />
    </div>
  );
}

export default Pricing;
