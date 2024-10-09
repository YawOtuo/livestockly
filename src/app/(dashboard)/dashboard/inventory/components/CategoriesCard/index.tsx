import { InventoryCategory } from "@/lib/types/inventory";

type Props = {
  category: InventoryCategory;
};

function CategoryCard({ category }: Props) {
  return <div className="border px-5 py-1 rounded-lg     capitalize text-xs">{category.name}</div>;
}

export default CategoryCard;
