"use client"

import {ColumnDef} from "@tanstack/react-table"
import {User} from "@/types";
import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {ArrowUpDown, CheckCircle2Icon, MoreHorizontal, XCircleIcon} from "lucide-react";
import {Link} from "@inertiajs/react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export let columns: ColumnDef<User>[];
columns = [
  {
    accessorKey: "#",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          #
        </Button>
      )
    },
    cell: ({row, table}) => {
      const nonSortedIdx =
        table.getSortedRowModel()?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0

      return <div className="w-fit pl-4">{nonSortedIdx + 1}{' '}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
  },
  {
    accessorKey: "username",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          UserName
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
  },
  {
    accessorKey: "email_verified_at",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Verified
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
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
    },
  },
  {
    accessorKey: "roles",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Roles
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
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
    accessorKey: "permissions",
    header:
      ({column}) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Permissions
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
        )
      },
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
  }
  ,
  {
    accessorKey: "action",
    header:
      "Action",
    cell:
      ({row}) => {
        let user = row.original;
        return (
          <Link className="w-full text-left text-blue-500" href={route('user.edit', user.id)}>
            Edit
          </Link>
        );
      },
  },
];
