import { ColumnDef } from "@tanstack/react-table";

export function filterColumnsIsAdminTable(
  columnsUpcomingReservations: ColumnDef<any>[],
  accessorKey: string
) {
  const isAdmin = localStorage.getItem("userType") === "admin" ? true : false;
  return columnsUpcomingReservations.filter(
    // @ts-ignore
    (column) => column?.accessorKey !== accessorKey || isAdmin
  );
}

export const addPrefixToKeys = (
  titles: Record<string, string>,
  prefix: string
): Record<string, string> => {
  return Object.keys(titles).reduce((acc, key) => {
    const newKey = `/${prefix}${key}`; 
    acc[newKey] = titles[key]; 
    return acc;
  }, {} as Record<string, string>);
};
