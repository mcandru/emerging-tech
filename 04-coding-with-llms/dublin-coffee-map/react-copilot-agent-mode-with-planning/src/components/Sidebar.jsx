import { cn } from "../lib/utils";
import ShopList from "./ShopList";

export default function Sidebar({
  shops,
  activeShopId,
  onSelectShop,
  isOpen,
  mode = "inline",
}) {
  const isSheet = mode === "sheet";

  return (
    <aside
      className={cn(
        "z-900 flex h-full flex-col overflow-hidden border-r border-[#ddd] bg-white shadow-none",
        isSheet ? "w-full" : "w-87.5 transition-transform",
        !isSheet &&
          "max-md:absolute max-md:left-0 max-md:top-0 max-md:h-full max-md:w-[85%] max-md:max-w-[320px] max-md:shadow-[2px_0_10px_rgba(0,0,0,0.2)]",
        !isSheet &&
          (isOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"),
      )}
    >
      <div className="border-b border-[#eee] bg-(--bg-color) px-6 py-6">
        <h2 className="mb-2 text-lg font-semibold text-(--primary-color)">
          Curated Selection
        </h2>
        <p className="text-sm leading-relaxed text-[#666]">
          A guide to the finest specialty coffee shops across Dublin City, from
          historic cafes to modern micro-roasters.
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ShopList
          shops={shops}
          activeShopId={activeShopId}
          onSelectShop={onSelectShop}
        />
      </div>
    </aside>
  );
}
