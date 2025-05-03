import { Schema } from "effect";

const TodoIdTypeId = Symbol.for("@Todos/TodoId");
export const TodoId = Schema.UUID.pipe(
  Schema.brand(TodoIdTypeId),
  Schema.annotations({
    identifier: "@Todos/TodoId",
  })
);

export const Todo = Schema.Struct({
  id: TodoId,
  title: Schema.String,
  description: Schema.String,
  completed: Schema.Boolean,
  createdAt: Schema.DateTimeUtcFromDate,
  updatedAt: Schema.DateTimeUtcFromDate,
});

export type Todo = Schema.Schema.Type<typeof Todo>;
