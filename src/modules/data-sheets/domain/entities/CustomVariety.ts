import { Schema } from "effect";
import { Variety } from "./Variety";

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
    rootVarietyId: Schema.Option(Variety),
  })
);

export type CustomVariety = Schema.Schema.Type<typeof CustomVariety>;
