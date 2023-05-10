import { Navigation } from "./Navigation";
import { Sidebar } from "./Sidebar";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Navigation />
      <main className="flex overflow-hidden bg-white pt-16">
        <Sidebar />
        <div className="relative h-full w-full overflow-y-auto bg-gray-50 lg:ml-64">
          {children}
        </div>
      </main>
    </>
  );
};
