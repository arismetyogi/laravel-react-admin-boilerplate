import AuthenticatedLayout from "@/layouts/authenticated-layout";
import {Head} from "@inertiajs/react";
import {PageProps, User} from "@/types";
import {can} from "@/helper";
import {DataTable} from "@/components/table/data-table";
// import {columns} from "@/pages/user/columns";
import {useMemo} from "react";
import {ColumnDef} from "@tanstack/react-table";
import ColumnHeader from "@/components/table/column-header";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getAvatar} from "@/lib/utils";

export default function Index({auth, users}: PageProps<{ users: User[] }>) {

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: "avatar",
        header: ({column}) => <ColumnHeader column={column} title="Avatar"/>,
        enableSorting: false,
        cell: ({row}) => {
          const user = row.original;
          return <Avatar>
            <AvatarImage src={user.avatar} alt="Avatar"/>
            <AvatarFallback>{getAvatar(user.name)}</AvatarFallback>
          </Avatar>
        }
      },
    ],
    []
  );
  return (
    <AuthenticatedLayout
      header="Users"
    >
      <Head title="Users"/>

      {can(auth.user, 'manage-users') &&
        <div className="flex flex-1 flex-col gap-4 h-full">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          </div>
          <div className="flex-1 rounded-xl bg-muted/50 h-full p-4">
            <DataTable columns={columns} data={users}/>
          </div>
        </div>
      }
    </AuthenticatedLayout>
  );
}
