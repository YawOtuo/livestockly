import { InventoryCategory } from "@/lib/types/inventory";
import Link from "next/link";

type Props = {
  category: InventoryCategory;
};

function CategoryCard({ category }: Props) {
  return (
    <Link href={`/dashboard/inventory/categories/${category?.name}/${category?.id}`}>
      <button className="shadow px-5 py-1 rounded-lg     capitalize text-xs bg-secondary text-black w-fit">
        {category.name}
      </button>
    </Link>
  );
}

export default CategoryCard;
