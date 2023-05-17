import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useMemo,
  useState,
} from "react";
import { DividerHorizontalIcon, CheckIcon } from "@radix-ui/react-icons";
import { Root, Indicator, CheckedState } from "@radix-ui/react-checkbox";
import { truncate } from "~/utils/helpers";
import classNames from "classnames";

type Category = {
  id: number;
  image: string;
  name: string;
  description: string;
  slug: string;
  count: number;
};

const defaultData: Category[] = [
  {
    id: 1234,
    image: "https://picsum.photos/200",
    name: "Bags",
    description: "",
    slug: "bags",
    count: 0,
  },
  {
    id: 1235,
    image: "https://picsum.photos/200",
    name: "Watches",
    description: "",
    slug: "watches",
    count: 0,
  },
  {
    id: 1236,
    image: "https://picsum.photos/200",
    name: "Jewelery",
    description: "",
    slug: "jewelery",
    count: 0,
  },
];

type CheckboxProps = ComponentPropsWithoutRef<typeof Root> & {
  onCheckedChange?: (checked: CheckedState) => void;
};

const Checkbox = forwardRef<ElementRef<typeof Root>, CheckboxProps>(
  (props, forwardedRef) => (
    <div className="">
      <Root
        {...props}
        ref={forwardedRef}
        className={classNames(
          "focus:ring-3 flex h-6 w-6 appearance-none items-center justify-center rounded border outline-none focus:ring-cyan-200",
          props.checked
            ? "border-sky-500 bg-sky-500 text-white"
            : "border-slate-300 bg-white text-slate-500"
        )}
      >
        <Indicator className="text-sky-500">
          {props.checked === "indeterminate" && (
            <DividerHorizontalIcon className="text-white" />
          )}
          {props.checked === true && <CheckIcon className="text-white" />}
        </Indicator>
      </Root>
      <label htmlFor={props.id} className="sr-only">
        checkbox
      </label>
    </div>
  )
);

const columnHelper = createColumnHelper<Category>();

const DataTable = () => {
  const [data, setData] = useState(() => [...defaultData]);

  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            {...{
              checked:
                table.getIsAllPageRowsSelected() === true
                  ? true
                  : table.getIsSomeRowsSelected()
                  ? "indeterminate"
                  : undefined,
              onCheckedChange: (checked) =>
                table.toggleAllPageRowsSelected(checked === true),
            }}
          />
        ),
        cell: ({ row, cell }) => (
          <Checkbox
            {...{
              id: `checkbox-${row.original.id}`,
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              onCheckedChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      }),
      columnHelper.accessor("image", {
        header: "Image",
        cell: (info) =>
          info.getValue() ? (
            <img
              className="h-12 w-12 overflow-auto rounded"
              src={info.getValue()}
            />
          ) : (
            ""
          ),
      }),
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => truncate(info.getValue(), 30),
      }),
      columnHelper.accessor("slug", {
        header: "Slug",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("count", {
        header: "Count",
        cell: (info) => info.getValue(),
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  return (
    <table className="min-w-full table-fixed divide-y divide-gray-200">
      <thead className="bg-gray-100">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="p-4 text-left text-xs font-normal uppercase text-gray-500"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="whitespace-nowrap p-4 text-base font-medium text-slate-700"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
