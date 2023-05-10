import Breadcrumbs from "../breadcrumbs";
import { Navigation } from "./Navigation";
import { Sidebar } from "./Sidebar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation />
      <main className="flex overflow-hidden bg-white pt-16">
        <Sidebar />
        <div className="relative h-full w-full overflow-y-auto bg-gray-50 lg:ml-64">
          <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 sm:flex lg:mt-1.5">
            <Breadcrumbs />
          </div>
          {children}
        </div>
      </main>
    </>
  );
};
