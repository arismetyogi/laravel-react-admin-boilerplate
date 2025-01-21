import AuthenticatedLayout from "@/layouts/authenticated-layout";
import {Head, router} from "@inertiajs/react";
import {PageProps, User} from "@/types";
import {can, ucwords} from "@/helper";
import {DataTable} from "@/components/table/data-table";
import {useMemo, useState} from "react";
import {ColumnDef} from "@tanstack/react-table";
import ColumnHeader from "@/components/table/column-header";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn, getAvatar} from "@/lib/utils";
import {
  CheckCircle2Icon,
  Edit,
  LockKeyhole,
  LockKeyholeOpen,
  MoreHorizontal,
  Trash2,
  XCircleIcon
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import toast, { Toaster } from "react-hot-toast";
import ConfirmAlert from "@/components/confirm-alert";
import AddUserSheet from "@/components/add-user-sheet";
import EditUserSheet from "@/components/edit-user-sheet";

type AlertType = "delete" | "activate" | "block"

const Index = ({auth, users}: PageProps<{ users: User[] }>) => {

  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>();
  const [selectedUser, setSelectedUser] = useState<User>();
  const [openAddUserSheet, setOpenAddUserSheet] = useState(false);
  const [openEditUserSheet, setOpenEditUserSheet] = useState(false);

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: "#",
        accessorKey: "#",
        header: ({column}) => <ColumnHeader column={column} title="#"/>,
        enableSorting: false,
        cell: ({row, table}) => {
          const nonSortedIdx =
            table.getSortedRowModel()?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0
          return <div className="w-fit pl-4">{nonSortedIdx + 1}{' '}</div>;
        },
      },
      {
        id: "avatar",
        header: ({column}) => <ColumnHeader column={column} title=""/>,
        enableSorting: false,
        cell: ({row}) => {
          const user = row.original;
          return <Avatar>
            <AvatarImage src={user.avatar} alt="Avatar"/>
            <AvatarFallback>{getAvatar(user.name)}</AvatarFallback>
          </Avatar>
        }
      },
      {
        id: "name",
        header: ({column}) => <ColumnHeader column={column} title="Name"/>,
        enableSorting: true,
        accessorKey: "name",
        cell: ({row}) =>{
          return ucwords(row.original.name);
        }
      },
      {
        id: "username",
        header: ({column}) => <ColumnHeader column={column} title="Email/Username"/>,
        enableSorting: true,
        accessorKey: "username",
        cell:  ({ row }) => {
          const username:string = row.original.username;
          const email:string = row.original.email;

          return (
            <div>
              <span className="text-gray-800 dark:text-white">{email}</span>
              <br />
              <span className="text-xs text-gray-400">{username}</span>
            </div>
          );
        },
      },
      {
        id: "is_active",
        header: ({column}) => <ColumnHeader column={column} title="Status"/>,
        enableSorting: true,
        accessorKey: "is_active",
        cell: ({row}) => {
          const user = row.original;
          return <div className={cn("inline-block px-2 py-0.5 rounded-md", user.is_active ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700")}>
            {user.is_active? "Active" : "Inactive"}
          </div>
        }
      },
      {
        id: "email_verified_at",
        header: ({column}) => <ColumnHeader column={column} title="Verified"/>,
        enableSorting: true,
        accessorKey: "email_verified_at",
        cell: ({row}) => {
          const isVerified = row.original.email_verified_at !== null; // Check if verified
          return (
            <div className="flex items-center justify-center">
              {isVerified ? (
                <CheckCircle2Icon className="h-5 w-5 text-green-500"/> // Green check icon
              ) : (
                <XCircleIcon className="h-5 w-5 text-red-500"/> // Red cross icon
              )}
            </div>
          );
        }
      },
      {
        id: "roles",
        accessorKey: "roles",
        header: ({column}) => <ColumnHeader column={column} title="Roles"/>,
        cell: ({row}) => (
          <div className="flex flex-wrap gap-2">
            {Array.isArray(row.original.roles) && row.original.roles.length > 0
              ? row.original.roles.map((role: string, index: number) => {
                const roleColor =
                  role === "admin"
                    ? "text-blue-700"
                    : role === "user"
                      ? "text-gray-700"
                      : role === "super-admin"
                        ? "text-red-700"
                        : "text-green-700"; // Default color for other roles
                return (
                  <span
                    key={index}
                    className={`inline-block px-2 font-normal ${roleColor}`}
                  >
            {role == 'user' ? 'User' : (role == 'admin' ? 'Admin' : 'Super Admin')}
          </span>
                );
              })
              : ''}
          </div>
        )
      },
      {
        id: "permissions",
        accessorKey: "permissions",
        header: ({column}) => <ColumnHeader column={column} title="Permissions"/>,
        cell:
          ({row}) => (
            <div className="flex flex-wrap gap-2">
              {Array.isArray(row.original.permissions) && row.original.permissions.length > 0
                ? row.original.permissions.map((permission: string, index: number) => (
                  <span
                    key={index}
                    className="inline-block rounded-full bg-green-100 px-2 text-xs font-normal text-green-700"
                  >
            {permission}
          </span>
                ))
                : <span className="text-gray-500 text-xs px-2">No permissions assigned</span>}
            </div>
          ),
      },
      {
        id: "action",
        accessorKey: "action",
        header: ({column}) => <ColumnHeader column={column} title="Action"/>,
        enableSorting: false,
        cell:
          ({row}) => {
            let user = row.original;
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open Menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => {
                    setSelectedUser(user);
                    setOpenEditUserSheet(true);
                  }}>
                    <Edit /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => presentAlert(user, "delete")}>
                    <Trash2 /> Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      presentAlert(user, user.is_active ?  "block" : "activate")
                  }>
                    {user.is_active ? <LockKeyhole/> : <LockKeyholeOpen/>}
                    {user.is_active ? "Block" : "Activate"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
      },
    ],
    []
  );

  const presentAlert = (user: User,  type: AlertType) => {
    setSelectedUser(user);
    setAlertType(type);
    setOpenAlert(true);
  }

  const handleDelete = () => {
    router.delete(route('users.destroy', selectedUser?.id), {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        toast.success(`${selectedUser?.name}'s account has been deleted!`);
        setSelectedUser(undefined);
      },
    });
  }

  const handleUpdateStatus = () => {
    router.post(route('users.status', selectedUser?.id),
      {status: alertType},
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`${selectedUser?.name}'s status has been updated!`);
          setSelectedUser(undefined);
        }
      })
  }

  return (
    <AuthenticatedLayout
      header="Manage Users"
    >
      <Head title="Users"/>

      {can(auth.user, 'manage-users') &&
        <div className="flex flex-1 flex-col gap-4 h-full">
          <div className="flex items-center justify-between pr-10">
            <div className="pl-4">
              Manage User Configuration and Roles/Permissions
            </div>
            <Button onClick={() => setOpenAddUserSheet(true)}>Create New User</Button>
          </div>
          <div className="flex-1 rounded-xl bg-muted/50 h-full p-4">
            <DataTable columns={columns} data={users}/>

            <ConfirmAlert
              title={`Confirm ${alertType}`}
              message={`Are you sure you want to ${alertType} ${selectedUser?.name}?`}
              open={openAlert}
              onOpenChange={setOpenAlert}
              onConfirm={alertType === "delete" ? handleDelete : handleUpdateStatus}
            />

            <AddUserSheet
              open={openAddUserSheet}
              onOpenChange={setOpenAddUserSheet}
            />

            {selectedUser && openEditUserSheet && (
              <EditUserSheet
                selected={selectedUser}
                open={openEditUserSheet}
                onOpenChange={(openState) => {
                  setSelectedUser(undefined);
                  setOpenEditUserSheet(openState);
                }}
              />
            )}

            <Toaster />
          </div>
        </div>
      }
    </AuthenticatedLayout>
  );
}

export default Index;
