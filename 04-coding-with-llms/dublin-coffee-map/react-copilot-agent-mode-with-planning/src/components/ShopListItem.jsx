import { cn } from "../lib/utils";

export default function ShopListItem({ shop, isActive, onSelect }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(shop.id)}
        className={cn(
          "shop-item group w-full border-b border-[#f0f0f0] px-6 py-5 text-left transition-all",
          isActive
            ? "bg-[#f0e6dd] border-l-4 border-(--accent-color)"
            : "hover:bg-[#faf5f0]",
        )}
      >
        <div
          className={cn(
            "transition-transform duration-200",
            !isActive && "group-hover:translate-x-1",
          )}
        >
          <div className="shop-name text-base font-bold text-(--primary-color)">
            {shop.name}
          </div>
          <div className="shop-area text-xs font-semibold uppercase tracking-[0.5px] text-(--accent-color)">
            {shop.area}
          </div>
          <div className="shop-desc text-sm text-[#555]">
            {shop.description}
          </div>
        </div>
      </button>
    </li>
  );
}
