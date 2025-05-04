import { mapCustomVarietyToDataSheetItemDto } from "@/modules/data-sheets/application/mappers/custom-variety-mappers.ts";
import { mapVarietyToDataSheetItemDto } from "@/modules/data-sheets/application/mappers/variety-mappers.ts";
import { DataSheetRepository } from "@/modules/data-sheets/domain/repositories/DataSheetRepository.ts";
import { Effect } from "effect";

export const GetDataSheetItemList = Effect.gen(function* () {
  const dataSheetRepository = yield* DataSheetRepository;
  const varieties = yield* dataSheetRepository.getAllVarieties;
  const customVarieties = yield* dataSheetRepository.getAllCustomVarieties;

  return [
    ...varieties.map(mapVarietyToDataSheetItemDto),
    ...customVarieties.map(mapCustomVarietyToDataSheetItemDto),
  ];
});
