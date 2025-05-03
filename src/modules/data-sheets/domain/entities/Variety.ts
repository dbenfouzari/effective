import { Schema } from "effect";

const VarietyIdTypeId = Symbol.for("@DataSheets/VarietyId");
export const VarietyId = Schema.UUID.pipe(
  Schema.brand(VarietyIdTypeId),
  Schema.annotations({
    identifier: "@DataSheets/VarietyId",
  })
);

export const Variety = Schema.Struct({
  id: VarietyId,
  name: Schema.String,
  createdAt: Schema.DateTimeUtcFromDate,
  updatedAt: Schema.DateTimeUtcFromDate,
});

export type Variety = Schema.Schema.Type<typeof Variety>;
