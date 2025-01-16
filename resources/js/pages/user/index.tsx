import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head } from "@inertiajs/react";
import {PageProps, User} from "@/types";
import {can} from "@/helper";
import {DataTable} from "@/components/table/data-table";
import {columns} from "@/pages/user/columns";

export default function Index({auth, users}: PageProps<{users: User[]}>) {

    return (
        <AuthenticatedLayout
            header="Users"
        >
            <Head title="Users" />

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
