import {LucideProps} from "lucide-react";
import {ForwardRefExoticComponent, ReactNode, RefAttributes} from "react";
import {Config} from "ziggy-js";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  roles: string[];
  permissions: string[];
}

export type PaginatedData< T = any > = {
  data: T[];
  links: Record<string, string>;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
  ziggy: Config & { location: string };
};

export type MenuItemProp = {
  title: string;
  href: string;
  icon?:
    | ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >
    | ReactNode;
  variant:
    | "link"
    | "default"
    | "ghost"
    | "destructive"
    | "outline"
    | "secondary"
    | null
    | undefined;
};
