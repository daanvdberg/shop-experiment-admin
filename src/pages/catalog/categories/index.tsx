import { GetServerSideProps } from "next";
import { MetaInformation } from "~/pages/_app";
import DataTable from "./components/DataTable";
import Toolbar from "./components/Toolbar";
import { api } from "~/utils/api";
import { ITEMS_PER_PAGE } from "~/constants";
import { Sort } from "~/types";
import { useState } from "react";

/* eslint-disable */
// TODO: investigate require-await
export const getServerSideProps: GetServerSideProps<{
  meta: MetaInformation;
}> = async () => {
  return { props: { meta: { title: "Categories" } } };
};
/* eslint-enable */

const Categories = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(2);

  const { isLoading, data } = api.category.getAll.useQuery(
    {
      take: pageSize,
      skip: 0,
      sort: Sort.Asc,
    },
    {
      onError: (err) => console.log(err.message),
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      getNextPageParam: (page) => {
        //console.log(11, page);
        return page.nextCursor;
      },
    }
  );

  const handleFetchNextPage = () => {
    setPageIndex((prev) => prev + 1);
  };

  const handleFetchPreviousPage = () => {
    setPageIndex((prev) => prev - 1);
  };

  console.log(data?.categories);

  return (
    <div>
      <Toolbar />
      <DataTable categories={data?.categories} />

      <div className="flex items-center gap-2">
        <button
          className="rounded border p-1"
          onClick={handleFetchPreviousPage}
        >
          {"<"}
        </button>
        <button className="rounded border p-1" onClick={handleFetchNextPage}>
          {">"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {pageIndex + 1} of {999}
          </strong>
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[2, 4, 6].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Categories;
