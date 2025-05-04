import type { DataSheetItemDto } from "@/modules/data-sheets/application/dto/DataSheetItemDto.ts";
import type { CustomVariety } from "@/modules/data-sheets/domain/entities/CustomVariety.ts";

export function mapCustomVarietyToDataSheetItemDto(
  customVariety: CustomVariety
): DataSheetItemDto {
  return {
    __type: "custom-variety",
    id: customVariety.id,
    name: customVariety.name,
    createdAt: customVariety.createdAt,
    updatedAt: customVariety.updatedAt,
  };
}
