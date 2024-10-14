import { InventoryCategory } from "@/lib/types/inventory";
import Link from "next/link";

type Props = {
  category: InventoryCategory;
};
function CategoriesAllCard({ category }: Props) {
  return (
    <Link
      href={`/dashboard/inventory/categories/${category.name}/${category.id} `}>
      <div className="rounded-md shadow p-5 hover:bg-bsecondary-400/5 transition-all capitalize">
        {category.name}
      </div>
    </Link>
  );
}

export default CategoriesAllCard;
