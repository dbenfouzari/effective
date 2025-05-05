import { Schema } from "effect";
import { Variety, VarietyId } from "./Variety";

const CustomVarietyIdTypeId = Symbol.for("@DataSheets/CustomVarietyId");
export const CustomVarietyId = Schema.UUID.pipe(
  Schema.brand(CustomVarietyIdTypeId),
  Schema.annotations({
    identifier: "@DataSheets/CustomVarietyId",
  })
);

export const CustomVariety = Schema.extend(
  Variety,
  Schema.Struct({
    id: CustomVarietyId,
    rootVarietyId: Schema.OptionFromSelf(VarietyId),
  })
);

export type CustomVariety = Schema.Schema.Type<typeof CustomVariety>;
