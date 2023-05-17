import { MetaInformation } from "~/pages/_app";
import Breadcrumbs from "../breadcrumbs";
import { Navigation } from "./Navigation";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  meta: MetaInformation;
  children: React.ReactNode;
}

export const MainLayout = ({ children, meta }: LayoutProps) => {
  return (
    <>
      <Navigation />
      <main className="flex overflow-hidden bg-white pt-16">
        <Sidebar />
        <div className="relative h-full w-full overflow-y-auto bg-gray-50 lg:ml-64">
          <div className="flex flex-col bg-white p-4 sm:flex lg:mt-1.5">
            <Breadcrumbs />
            {meta?.title ? (
              <h1 className="mb-4 text-2xl font-semibold">{meta.title}</h1>
            ) : null}
          </div>
          {children}
        </div>
      </main>
    </>
  );
};
