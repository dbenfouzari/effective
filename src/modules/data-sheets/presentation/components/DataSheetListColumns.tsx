import type { DataSheetItemDto } from "@/modules/data-sheets/application/dto/DataSheetItemDto.ts";
import type { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "effect";

export const getColumns = (language: string): ColumnDef<DataSheetItemDto>[] => {
  return [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "updatedAt",
      header: "Last Updated",
      cell: ({ row }) => {
        const date = row.getValue<DateTime.Utc>("updatedAt");

        return Intl.DateTimeFormat(language, {
          dateStyle: "short",
          timeStyle: "short",
        }).format(DateTime.toDateUtc(date));
      },
    },
  ];
};
