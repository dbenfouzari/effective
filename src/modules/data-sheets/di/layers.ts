import { AppLayer } from "@/app/di/layers.ts";
import { InMemoryDataSheetRepository } from "@/modules/data-sheets/infrastructure/repositories/InMemoryDataSheetRepository.ts";
import { Layer } from "effect";

export const DataSheetLayer = Layer.mergeAll(AppLayer, InMemoryDataSheetRepository);
