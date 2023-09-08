import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "./components/DataTable";
import Spinner from "./components/ui/Spinner";
import { status } from "./lib/utils";
import RowActions from "@/components/RowActions";
import { useAppContext, Member } from "@/contexts/AppProvider";

function App() {
  const { data, status: progress } = useAppContext();

  const columns: ColumnDef<Member>[] = [
    {
      id: "select",
      enableGlobalFilter: true,
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      enableGlobalFilter: true,
      header: "Name",
    },
    {
      accessorKey: "email",
      enableGlobalFilter: true,
      header: "Email",
    },
    {
      accessorKey: "role",
      enableGlobalFilter: true,
      header: "Role",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return <RowActions row={row} />;
      },
    },
  ];
  return (
    <>
      <div className="w-full p-8">
        {progress === status.LOADING || progress === status.IDLE ? (
          <Spinner />
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </>
  );
}

export default App;
