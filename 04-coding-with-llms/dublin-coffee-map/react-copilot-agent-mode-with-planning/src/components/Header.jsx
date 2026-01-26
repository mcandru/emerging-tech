import { Coffee, Menu } from "lucide-react";
import { Button } from "./ui/button";

export default function Header({ onToggleSidebar }) {
  return (
    <header className="relative z-1000 flex h-16 items-center justify-between bg-(--primary-color) px-6 text-white shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <Coffee
          className="h-5 w-5 text-(--secondary-color)"
          aria-hidden="true"
        />
        <span className="font-display text-lg">Dublin Coffee Map</span>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onToggleSidebar}
        className="md:hidden border border-white/20 bg-white/10 text-white hover:bg-white/20"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </Button>
    </header>
  );
}
