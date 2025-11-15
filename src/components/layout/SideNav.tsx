import { LayoutDashboard, Store, Package, ShoppingCart, FileText } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

interface SideNavProps {
  isOpen: boolean;
}

const menuItems = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/outlets", icon: Store, label: "Outlets" },
  { to: "/admin/items", icon: Package, label: "Items & Recipes" },
  { to: "/admin/purchase-vendors", icon: ShoppingCart, label: "Purchase & Vendors" },
  { to: "/admin/reports", icon: FileText, label: "Reports" },
];

export const SideNav = ({ isOpen }: SideNavProps) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-300 ease-in-out z-40",
        isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"
      )}
    >
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-smooth"
              activeClassName="bg-primary/10 text-primary font-medium"
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
