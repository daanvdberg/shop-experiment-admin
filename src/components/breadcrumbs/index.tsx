import Link from "next/link";
import { useRouter } from "next/router";
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

const Breadcrumbs = () => {
  const router = useRouter();

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function generateBreadcrumbs() {
    const asPathWithoutQuery = router.asPath.split("?")[0] || "";

    const asPathNestedRoutes = asPathWithoutQuery
      .split("/")
      .filter((v) => v.length > 0);

    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
      const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
      const title = capitalizeFirstLetter(subpath);
      return { href, title, icon: ChevronRightIcon };
    });

    return [{ href: "/", title: "Home", icon: HomeIcon }, ...crumblist];
  }

  const breadcrumbs = generateBreadcrumbs();

  console.log(router);

  return (
    <nav className="mb-5 flex" aria-label="breadcrumb">
      <ol className="inline-flex items-center space-x-1 text-sm md:space-x-2">
        {breadcrumbs.map((crumb, index) => {
          const wrapCrumb = (children: ReactNode) =>
            index === breadcrumbs.length - 1 ? (
              <span className="inline-flex items-center text-slate-400">
                {children}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="inline-flex items-center text-slate-700 hover:text-sky-700"
              >
                {children}
              </Link>
            );
          return (
            <li key={crumb.href} className="inline-flex items-center">
              {wrapCrumb(
                <>
                  {crumb.icon ? (
                    <crumb.icon className="mr-2 w-[17px] text-slate-400" />
                  ) : null}{" "}
                  {crumb.title}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
