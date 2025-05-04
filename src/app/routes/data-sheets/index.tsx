import { GetDataSheetItemList } from "@/modules/data-sheets/application/use-cases/GetDataSheetItemList.ts";
import { DataSheetLayer } from "@/modules/data-sheets/di/layers.ts";
import { DataSheetListPage } from "@/modules/data-sheets/presentation/pages/data-sheet-list/DataSheetListPage.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { Effect } from "effect";

export const Route = createFileRoute("/data-sheets/")({
  component: DataSheetListPage,
  loader: () =>
    Effect.runPromise(
      GetDataSheetItemList.pipe(
        Effect.provide(DataSheetLayer),
        Effect.map((dataSheets) => ({
          dataSheets,
        })),
        Effect.catchAll((_error) =>
          Effect.succeed({
            dataSheets: [],
          })
        )
      )
    ),
});
