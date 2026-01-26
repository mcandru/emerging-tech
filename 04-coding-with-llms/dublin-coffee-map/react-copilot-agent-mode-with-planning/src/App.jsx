import { useState } from "react";
import coffeeShops from "./data/coffeeShops.json";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MapView from "./components/MapView";
import { Sheet, SheetContent } from "./components/ui/sheet";

function App() {
  const [activeShopId, setActiveShopId] = useState(coffeeShops[0]?.id ?? null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSelectShop = (shopId) => {
    setActiveShopId(shopId);
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-(--bg-color) text-(--text-color)">
      <Header onToggleSidebar={toggleSidebar} />
      <main className="relative flex h-[calc(100vh-64px)]">
        <div className="hidden md:block">
          <Sidebar
            shops={coffeeShops}
            activeShopId={activeShopId}
            onSelectShop={handleSelectShop}
            isOpen
          />
        </div>
        <div className="flex-1">
          <MapView shops={coffeeShops} activeShopId={activeShopId} />
        </div>
      </main>
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-[85%] max-w-[320px] p-0">
          <Sidebar
            shops={coffeeShops}
            activeShopId={activeShopId}
            onSelectShop={handleSelectShop}
            isOpen
            mode="sheet"
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default App;
