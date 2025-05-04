import { DataSheetItemDto } from "@/modules/data-sheets/application/dto/DataSheetItemDto.ts";
import type { Variety } from "@/modules/data-sheets/domain/entities/Variety.ts";

export function mapVarietyToDataSheetItemDto(variety: Variety) {
  return DataSheetItemDto.make({
    __type: "variety",
    id: variety.id,
    name: variety.name,
    createdAt: variety.createdAt,
    updatedAt: variety.updatedAt,
  });
}
