import { DataSheetListPage } from "@/modules/data-sheets/presentation/pages/data-sheet-list/DataSheetListPage.tsx";
import { getDataSheetListPage } from "@/modules/data-sheets/presentation/pages/data-sheet-list/di.ts";
import { createFileRoute } from "@tanstack/react-router";
import { Effect } from "effect";

export const Route = createFileRoute("/data-sheets/")({
  component: DataSheetListPage,
  loader: () =>
    Effect.runPromise(
      getDataSheetListPage.pipe(
        Effect.catchAll((_error) =>
          Effect.succeed({
            dataSheets: [],
          })
        )
      )
    ),
});
