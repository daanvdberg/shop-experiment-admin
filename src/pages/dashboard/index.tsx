import { ReactElement } from "react";
import { DashboardLayout } from "~/components/layout/DashboardLayout";

const Dashboard = () => {
  return (
    <div className="px-4 py-6">
      <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
        <div className="rounded-lg bg-white p-4 shadow sm:p-6 xl:p-8  2xl:col-span-2">
          Dashboard
        </div>
      </div>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
