import { DataSheetItemDto } from "@/modules/data-sheets/application/dto/DataSheetItemDto.ts";
import { DataSheetListPage } from "@/modules/data-sheets/presentation/pages/DataSheetListPage.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { Effect, Schema, pipe } from "effect";

export const Route = createFileRoute("/data-sheets/")({
  component: DataSheetListPage,
  loader: () =>
    pipe(
      Effect.promise(() => {
        const dataSheets: DataSheetItemDto[] = [
          Effect.runSync(
            Schema.decode(DataSheetItemDto)({
              __type: "variety",
              id: "123e4567-e89b-12d3-a456-426614174000",
              name: "Variety 1",
              createdAt: new Date(),
              updatedAt: new Date("2023-10-01T12:00:00Z"),
            })
          ),
        ];

        return Promise.resolve({ dataSheets });
      }),
      Effect.runPromise
    ),
});
