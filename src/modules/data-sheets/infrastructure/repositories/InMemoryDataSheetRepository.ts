import { Variety, VarietyId } from "@/modules/data-sheets/domain/entities/Variety.ts";
import { DataSheetRepository } from "@/modules/data-sheets/domain/repositories/DataSheetRepository.ts";
import { DateTime, Effect, Layer } from "effect";

export const InMemoryDataSheetRepository = Layer.succeed(
  DataSheetRepository,
  DataSheetRepository.of({
    getAllCustomVarieties: Effect.succeed([]),
    getAllVarieties: Effect.succeed([
      Variety.make({
        id: VarietyId.make("0e6f32a5-5817-4bb2-b726-1a31232a2a50"),
        name: "Coeur de boeuf",
        createdAt: DateTime.unsafeFromDate(new Date()),
        updatedAt: DateTime.unsafeFromDate(new Date()),
      }),
    ]),
  })
);
