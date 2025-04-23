import { Table } from "@tanstack/react-table";
import Link from "next/link";
import { X, Trash2, Ban, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/app/(dashboard)/(routes)/users/_components/data-table-view-options";
import { DataTableFacetedFilter } from "@/app/(dashboard)/(routes)/users/_components/data-table-faceted-filter";
import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterableColumns?: {
    id: string;
    title: string;
    options: {
      label: string;
      value: string;
    }[];
  }[];
  searchableColumns?: {
    id: string;
    title: string;
  }[];
}

export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
  searchableColumns = [],
}: DataTableToolbarProps<TData>) {
  const { onOpen } = useModal();
  const isFiltered = table.getState().columnFilters.length > 0;
  const isSelected =
    table.getIsAllPageRowsSelected() ||
    (table.getIsSomePageRowsSelected() && "indeterminate");
  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  const handleDeleteMultipleUsers = () => {
    onOpen(ModalType.DELETE_MULTIPLE_USERS, {
      // @ts-ignore
      ids: selectedRows.map((row) => row.id),
    });
  };

  const handleBlockMultipleUsers = () => {
    onOpen(ModalType.BLOCK_MULTIPLE_USERS, {
      // @ts-ignore
      ids: selectedRows.map((row) => row.id),
    });
  };

  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex flex-1 items-center space-x-2">
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            (column) =>
              table.getColumn(column.id) && (
                <Input
                  key={column.id}
                  placeholder={`Search ${column.title}...`}
                  value={
                    (table.getColumn(column.id)?.getFilterValue() as string) ??
                    ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn(column.id)
                      ?.setFilterValue(event.target.value)
                  }
                  className="w-[250px] lg:w-[350px] h-8 placeholder:!text-sm"
                />
              )
          )}
        <DataTableViewOptions table={table} />

        {filterableColumns.length > 0 &&
          filterableColumns.map(
            (column) =>
              table.getColumn(column.id) && (
                <DataTableFacetedFilter
                  key={column.id}
                  column={table.getColumn(column.id)}
                  title={column.title}
                  options={column.options}
                />
              )
          )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {isSelected && (
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteMultipleUsers}
          >
            <Trash2 className="h-4 w-4" /> Users
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleBlockMultipleUsers}
          >
            <Ban className="h-4 w-4" /> Users
          </Button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button size="sm" asChild>
          <Link href="/users/new">
            <Plus /> Add
          </Link>
        </Button>
      </div>
    </div>
  );
}
