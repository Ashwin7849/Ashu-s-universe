import { AppsTable } from "@/components/admin/apps-table";

export default function AdminAppsPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Apps</h1>
      </div>
      <div
        className="flex flex-1 items-start justify-center rounded-lg border border-dashed shadow-sm"
      >
        <AppsTable />
      </div>
    </>
  );
}
