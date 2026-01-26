import ShopListItem from "./ShopListItem";

export default function ShopList({ shops, activeShopId, onSelectShop }) {
  return (
    <ul className="list-none p-0">
      {shops.map((shop) => (
        <ShopListItem
          key={shop.id}
          shop={shop}
          isActive={shop.id === activeShopId}
          onSelect={onSelectShop}
        />
      ))}
    </ul>
  );
}
