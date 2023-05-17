import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ChartPieIcon,
  TagIcon,
  ShoppingBagIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import useNavigation from "~/stores/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard", IconComponent: ChartPieIcon },
  { name: "Categories", href: "/catalog/categories", IconComponent: TagIcon },
  {
    name: "Products",
    href: "/catalog/products",
    IconComponent: ShoppingBagIcon,
  },
  { name: "Users", href: "/users", IconComponent: ShoppingBagIcon },
  { name: "Orders", href: "/orders", IconComponent: DocumentTextIcon },
];

export const Sidebar = () => {
  const setNavVisibility = useNavigation((state) => state.setVisible);
  const navVisible = useNavigation((state) => state.visible);
  const pathname = usePathname();

  return (
    <>
      <aside
        className={classNames(
          "transition-width fixed left-0 top-0 z-20 flex h-full w-64 flex-shrink-0 flex-col pt-16 duration-75 lg:flex",
          navVisible ? "" : "hidden"
        )}
      >
        <div className="relative flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white pt-0">
          <div className="overflow-y-auton flex flex-1 flex-col pb-4 pt-5">
            <div className="flex-1 space-y-1 divide-y bg-white px-3">
              <ul className="space-y-2 pb-2">
                {navigation.map(({ name, href, IconComponent }) => (
                  <li key={name}>
                    <Link
                      href={href}
                      className={classNames(
                        "group flex items-center rounded-lg p-3 text-xs font-medium uppercase hover:bg-gray-100",
                        pathname === href ? "text-sky-700" : ""
                      )}
                      aria-current={pathname === href ? "page" : undefined}
                      onClick={() => setNavVisibility(false)}
                    >
                      <IconComponent className="mr-3 w-5 opacity-50" />
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>
      <div
        className={classNames(
          "fixed inset-0 z-10 bg-gray-900 opacity-50",
          navVisible ? "" : "hidden"
        )}
        onClick={() => setNavVisibility(false)}
      ></div>
    </>
  );
};
