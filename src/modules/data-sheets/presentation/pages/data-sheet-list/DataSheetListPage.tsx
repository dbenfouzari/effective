import { Route as DataSheetsRoute } from "@/app/routes/data-sheets";
import { getColumns } from "@/modules/data-sheets/presentation/components/DataSheetListColumns.tsx";
import { DataSheetTable } from "@/modules/data-sheets/presentation/components/DataSheetTable.tsx";
import { useState } from "react";

export function DataSheetListPage() {
  const { dataSheets } = DataSheetsRoute.useLoaderData();
  const [language] = useState(() => window.navigator.language);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Data Sheets</h1>
      <p>List of data sheets</p>

      <DataSheetTable columns={getColumns(language)} data={dataSheets} />
    </div>
  );
}
