import { describe, expect, it } from "bun:test";
import { GetDataSheetItemList } from "@/modules/data-sheets/application/use-cases/GetDataSheetItemList.ts";
import { CustomVariety } from "@/modules/data-sheets/domain/entities/CustomVariety.ts";
import { Variety } from "@/modules/data-sheets/domain/entities/Variety.ts";
import { DataSheetRepository } from "@/modules/data-sheets/domain/repositories/DataSheetRepository.ts";
import { Cause, Effect, Exit, Layer, Option, ParseResult, Schema } from "effect";

const testVariety = Schema.decodeSync(Variety)({
  id: "0e6f32a5-5817-4bb2-b726-1a31232a2a50",
  name: "Test Variety",
  createdAt: new Date(),
  updatedAt: new Date(),
});

const testCustomVariety = Schema.decodeSync(CustomVariety)({
  id: "91e7e387-08f9-4307-812a-f80bf9eb33d3",
  name: "Test Custom Variety",
  createdAt: new Date(),
  updatedAt: new Date(),
  rootVarietyId: Option.none(),
});

const invalidVarieties = Effect.gen(function* () {
  const variety = yield* Schema.decode(Variety)({
    id: "invalid-id",
    name: "Invalid Variety",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return [variety];
});

const TestRepoLayer = Layer.succeed(
  DataSheetRepository,
  DataSheetRepository.of({
    getAllVarieties: Effect.succeed([testVariety]),
    getAllCustomVarieties: Effect.succeed([testCustomVariety]),
  })
);

const FailingRepoLayer = Layer.succeed(
  DataSheetRepository,
  DataSheetRepository.of({
    getAllVarieties: invalidVarieties,
    getAllCustomVarieties: Effect.succeed([testCustomVariety]),
  })
);

describe("GetDataSheetItemList", () => {
  it("returns a list of data sheet items", async () => {
    const result = await Effect.runPromise(
      GetDataSheetItemList.pipe(Effect.provide(TestRepoLayer))
    );

    expect(result).toStrictEqual([
      {
        __type: "variety",
        id: "0e6f32a5-5817-4bb2-b726-1a31232a2a50",
        name: "Test Variety",
        createdAt: testVariety.createdAt,
        updatedAt: testVariety.updatedAt,
      },
      {
        __type: "custom-variety",
        id: "91e7e387-08f9-4307-812a-f80bf9eb33d3",
        name: "Test Custom Variety",
        createdAt: testCustomVariety.createdAt,
        updatedAt: testCustomVariety.updatedAt,
      },
    ]);
  });

  it("fails when it encounters an error", async () => {
    const exit = await Effect.runPromiseExit(
      GetDataSheetItemList.pipe(Effect.provide(FailingRepoLayer))
    );

    if (!Exit.isFailure(exit)) {
      throw new Error("Expected failure, but got success");
    }

    if (!Cause.isFailType(exit.cause)) {
      throw new Error("Expected cause to be a failure");
    }

    expect(ParseResult.isParseError(exit.cause.error)).toBe(true);
  });
});
