import { Route as DataSheetsRoute } from "@/app/routes/data-sheets";
import { Button } from "@/components/ui/button.tsx";
import { getColumns } from "@/modules/data-sheets/presentation/components/DataSheetListColumns.tsx";
import { DataSheetTable } from "@/modules/data-sheets/presentation/components/DataSheetTable.tsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function DataSheetListPage() {
  const loaderData = DataSheetsRoute.useLoaderData();
  const [language] = useState(() => window.navigator.language);

  const queryClient = useQueryClient();

  const { data: dataSheets } = useQuery({
    queryKey: ["dataSheets"],
    queryFn: () => Promise.resolve(loaderData.dataSheets),
    initialData: loaderData.dataSheets,
  });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Data Sheets</h1>
      <p>List of data sheets</p>

      <Button
        type="button"
        onClick={() => queryClient.invalidateQueries({ queryKey: ["dataSheets"] })}
      >
        Invalidate Data Sheets
      </Button>

      <DataSheetTable columns={getColumns(language)} data={dataSheets} />
    </div>
  );
}
