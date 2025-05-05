import { withRetryPolicy } from "@/lib/effect/retry.ts";
import { GetDataSheetItemList } from "@/modules/data-sheets/application/use-cases/GetDataSheetItemList.ts";
import { DataSheetLayer } from "@/modules/data-sheets/di/layers.ts";
import { DataSheetListPage } from "@/modules/data-sheets/presentation/pages/data-sheet-list/DataSheetListPage.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { Effect } from "effect";

export const Route = createFileRoute("/data-sheets/")({
  component: DataSheetListPage,
  /**
   * Note to me later: if the result can be slow,
   * I can just return the promise and let the page load thanks to <Await />
   */
  loader: async () => {
    const promise = Effect.runPromise(
      GetDataSheetItemList.pipe(
        Effect.provide(DataSheetLayer),
        withRetryPolicy(),
        Effect.catchAll((_error) => Effect.succeed([]))
      )
    );

    return {
      dataSheets: await promise,
    };
  },
});
