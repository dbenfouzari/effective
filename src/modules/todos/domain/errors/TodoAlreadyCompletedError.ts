import type { Todo } from "@/modules/todos/domain/entities/Todo.ts";
import { TaggedError } from "effect/Data";

export class TodoAlreadyCompletedError extends TaggedError("TodoAlreadyCompletedError")<{
  todo: Todo;
}> {}
