import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "../ui/input"

import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import React from "react"
import { Card, CardContent, CardHeader } from "../ui/card"
import Loading from "../api/loading"

interface DataTableProps<TData, TValue> {
  title?: string
  loading?: boolean
  error?: any
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey: string[]
  textKey: string
  children?: React.ReactNode
}

export function DataTable<TData, TValue>({
  title,
  loading,
  error,
  columns,
  data,
  searchKey,
  textKey,
  children,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const [globalFilter, setGlobalFilter] = React.useState("")

  const table = useReactTable({
    data: data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: (row, columnId, filterValue) => {
      console.log(columnId)
      const searchValue = filterValue.toLowerCase()
      return searchKey.some((key) => {
        const cellValue = row.getValue(key)
        return cellValue && cellValue.toString().toLowerCase().includes(searchValue)
      })
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <Card className="w-full bg-transparent shadow-none border-none">
      <CardHeader className="flex flex-col md:flex-row justify-between md:items-center gap-4 p-0 py-4">
        <div className={"font-semibold leading-none tracking-tight text-nowrap"}>{title}</div>
        <div className="flex flex-row justify-between flex-1 gap-4">
          <div className="flex gap-x-2 items-center">
            <Input
              className="placeholder:!text-xs"
              placeholder={`${textKey} ...`}
              value={globalFilter}
              onChange={(event) => setGlobalFilter(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-x-2">{children}</div>
        </div>
      </CardHeader>
      <CardContent className="divide-y p-2 border rounded-xl">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-start font-bold text-black/85">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <Loading />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-red-500">
                  ربما حدث خطأ
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  لا توجد نتائج
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {!loading && !error && table.getRowModel().rows?.length > 0 && (
          <div className="flex items-center justify-between py-4 border-t mt-4">
            <div className="gap-x-2 w-full flex justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-6"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="rtl:rotate-180" />
              </Button>
              <Button variant={"ghost"} size={"icon"} className="h-6">
                {table.getState().pagination.pageIndex + 1}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-6"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight className="rtl:rotate-180" />
              </Button>
            </div>
            <div className="text-nowrap items-center text-xs text-gray-500">
              {!table.getCanNextPage()
                ? table.getFilteredRowModel().rows.length
                : table.getRowModel().rows?.length * (table.getState().pagination.pageIndex + 1)}{" "}
              من {table.getFilteredRowModel().rows.length}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

