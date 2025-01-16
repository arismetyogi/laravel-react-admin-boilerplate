"use client"

import {ColumnDef} from "@tanstack/react-table"
import {User} from "@/types";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {ArrowUpDown, CheckCircle2Icon, CheckIcon, MoreHorizontal, XCircleIcon, XIcon} from "lucide-react";
import {Link} from "@inertiajs/react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export let columns: ColumnDef<User>[];
columns = [
  {
    accessorKey: "#",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          #
        </Button>
      )
    },
    cell: ({ row, table }) => {
      const nonSortedIdx =
        table.getSortedRowModel()?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0

      return <div className="w-fit pl-4">{nonSortedIdx+1}{' '}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          UserName
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email_verified_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Verified
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isVerified = row.original.email_verified_at !== null; // Check if verified
      return (
        <div className="flex items-center justify-center">
          {isVerified ? (
            <CheckCircle2Icon className="h-5 w-5 text-green-500" /> // Green check icon
          ) : (
            <XCircleIcon className="h-5 w-5 text-red-500" /> // Red cross icon
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "roles",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Roles
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) =>
      Array.isArray(row.original.roles)
        ? row.original.roles.join(", ")
        : "No roles assigned", // Fallback for missing roles
  },
  {
    accessorKey: "permissions",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Permissions
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) =>
      Array.isArray(row.original.permissions)
        ? row.original.permissions
          .join(", ")
        : "No permissions assigned", // Fallback for missing roles
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({row}) => {
      let user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>
              <Link className="w-full text-left" href={route('user.edit', user.id)}>
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="w-full text-left" href={route('user.destroy', user.id)} method="delete">
                Delete
              </Link> </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
