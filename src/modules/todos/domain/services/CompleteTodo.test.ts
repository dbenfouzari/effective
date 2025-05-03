import { describe, expect, it } from "bun:test";
import { Todo } from "@/modules/todos/domain/entities/Todo.ts";
import { Effect, Schema, pipe } from "effect";
import { CompleteTodo } from "./CompleteTodo";

const incompleteTodo = Schema.decode(Todo)({
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "Test",
  description: "Test description",
  completed: false,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const completedTodo = Schema.decode(Todo)({
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "Test",
  description: "Test description",
  completed: true,
  createdAt: new Date(),
  updatedAt: new Date(),
});

describe("CompleteTodo", () => {
  it("should complete an incompleted todo", () => {
    const isSuccess = pipe(
      incompleteTodo,
      Effect.flatMap(CompleteTodo),
      Effect.isSuccess,
      Effect.runSync
    );

    expect(isSuccess).toBe(true);
  });

  it("should return a completed todo", () => {
    const isComplete = pipe(
      incompleteTodo,
      Effect.flatMap(CompleteTodo),
      Effect.map((completedTodo) => completedTodo.completed),
      Effect.runSync
    );

    expect(isComplete).toBe(true);
  });

  it("should return an error if the todo is already completed", () => {
    const isFailure = pipe(
      completedTodo,
      Effect.flatMap(CompleteTodo),
      Effect.isFailure,
      Effect.runSync
    );

    expect(isFailure).toBe(true);
  });
});
