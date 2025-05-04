import { GetDataSheetItemList } from "@/modules/data-sheets/application/use-cases/GetDataSheetItemList.ts";
import { InMemoryDataSheetRepository } from "@/modules/data-sheets/infrastructure/repositories/InMemoryDataSheetRepository.ts";
import { Effect } from "effect";

export const DataSheetListPageLayer = Effect.provide(
  GetDataSheetItemList,
  InMemoryDataSheetRepository
);

export const getDataSheetListPage = Effect.gen(function* () {
  return {
    dataSheets: yield* DataSheetListPageLayer,
  };
});
