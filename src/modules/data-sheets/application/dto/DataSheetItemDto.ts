import { Schema } from "effect";

export const DataSheetItemDto = Schema.Struct({
  __type: Schema.Union(Schema.Literal("variety"), Schema.Literal("custom-variety")),
  id: Schema.UUID,
  name: Schema.String,
  createdAt: Schema.DateTimeUtcFromDate,
  updatedAt: Schema.DateTimeUtcFromDate,
});

export type DataSheetItemDto = Schema.Schema.Type<typeof DataSheetItemDto>;
