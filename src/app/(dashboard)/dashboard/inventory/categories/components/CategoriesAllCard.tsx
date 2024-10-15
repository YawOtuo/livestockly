import DeleteCategoryModal from "@/components/modals/DeleteCategoryModal";
import EditCategoryModal from "@/components/modals/EditCategoryModal";
import { Button } from "@/components/ui/button";
import { InventoryCategory } from "@/lib/types/inventory";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { MdDeleteSweep } from "react-icons/md";

type Props = {
  category: InventoryCategory;
};
function CategoriesAllCard({ category }: Props) {
  return (
    <div className="rounded-md shadow p-5 hover:bg-bsecondary-400/5 transition-all capitalize flex flex-col items-start justify-between gap-0">
      <Link
        href={`/dashboard/inventory/categories/${category.name}/${category.id} `}>
        {category.name}
      </Link>

      <div className="flex items-center justify-between w-full gap-5">
        <Link
          href={`/dashboard/inventory/categories/${category.name}/${category.id} `}>
          <div className="lowercase text-sm text-slate-500">
            {category.item_count} item(s)
          </div>
        </Link>

        <div className="flex items-center gap-2 justify-center">
          <EditCategoryModal category={category} />
          <DeleteCategoryModal category={category}/>
        </div>
      </div>
    </div>
  );
}

export default CategoriesAllCard;
