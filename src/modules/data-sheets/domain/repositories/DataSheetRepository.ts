import type { CustomVariety } from "@/modules/data-sheets/domain/entities/CustomVariety.ts";
import type { Variety } from "@/modules/data-sheets/domain/entities/Variety.ts";
import { Context, type Effect } from "effect";
import type { ParseError } from "effect/ParseResult";

export class DataSheetRepository extends Context.Tag("DataSheetRepository")<
  DataSheetRepository,
  {
    readonly getAllVarieties: Effect.Effect<Variety[], ParseError>;
    readonly getAllCustomVarieties: Effect.Effect<CustomVariety[], ParseError>;
  }
>() {}
