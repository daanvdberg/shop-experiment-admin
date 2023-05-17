import { GetServerSideProps } from "next";
import { MetaInformation } from "~/pages/_app";
import DataTable from "./components/DataTable";
import Toolbar from "./components/Toolbar";

export const getServerSideProps: GetServerSideProps<{
  meta: MetaInformation;
}> = async () => ({ props: { meta: { title: "Categories" } } });

const Categories = () => {
  return (
    <div>
      <Toolbar />
      <DataTable />
    </div>
  );
};

export default Categories;
