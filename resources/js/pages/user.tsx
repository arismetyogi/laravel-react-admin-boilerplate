import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head } from "@inertiajs/react";

export default function User() {
    return (
        <AuthenticatedLayout
            header="Users"
        >
            <Head title="Users" />

            <div className="flex flex-1 flex-col gap-4 h-full">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                </div>
              <div className="flex-1 rounded-xl bg-muted/50 h-full p-4">
                Test User
              </div>
            </div>
        </AuthenticatedLayout>
    );
}
