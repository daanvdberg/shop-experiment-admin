import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { CiAvocado } from "react-icons/ci";
import Link from "next/link";
import {
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import useNavigation from "~/stores/navigation";
import classNames from "classnames";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Categories", href: "/catalog/categories" },
  { name: "Products", href: "/catalog/products" },
];

export const Navigation = () => {
  const { data: sessionData } = useSession();

  const toggleNavVisibility = useNavigation((state) => state.setVisible);
  const navVisible = useNavigation((state) => state.visible);

  const handleSignout = () => signOut();

  return (
    <nav className="fixed z-30 w-full border-b border-gray-200 bg-white">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={() => toggleNavVisibility(!navVisible)}
              className="mr-2 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 lg:hidden"
            >
              <Bars3Icon
                className={classNames("h-6 w-6", navVisible ? "hidden" : "")}
              />
              <XMarkIcon
                className={classNames("h-6 w-6", navVisible ? "" : "hidden")}
              />
            </button>
            <Link
              href="/dashboard"
              className="flex items-center text-lg font-bold text-sky-700 lg:ml-2.5"
            >
              <CiAvocado className="w-6" />
              <span className="self-center whitespace-nowrap">
                Avocado Admin
              </span>
            </Link>
            <form action="#" method="GET" className="hidden lg:block lg:pl-32">
              <label htmlFor="topbar-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1 lg:w-64">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="w-5" />
                </div>
                <input
                  type="text"
                  name="email"
                  id="topbar-search"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-gray-900 focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <div className="hidden whitespace-nowrap text-sm font-light sm:ml-6 sm:flex sm:items-center">
            Logged in as&nbsp;
            <span className="font-normal">{sessionData?.user.name}</span>
            <button
              className="ml-4 flex w-full items-center rounded-lg px-3 py-2 text-sm hover:bg-slate-100"
              onClick={() => void handleSignout()}
            >
              <ArrowRightOnRectangleIcon className="-mb-[1px] mr-2 w-4" />
              <span className="self-center whitespace-nowrap">Sign out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
