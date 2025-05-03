import { Todo } from "@/modules/todos/domain/entities/Todo.ts";
import { TodoAlreadyCompletedError } from "@/modules/todos/domain/errors/TodoAlreadyCompletedError.ts";
import { DateTime, Effect } from "effect";

export const CompleteTodo = (
  todo: Todo
): Effect.Effect<Todo, TodoAlreadyCompletedError> => {
  return Effect.gen(function* () {
    if (todo.completed) {
      yield* Effect.fail(new TodoAlreadyCompletedError({ todo }));
    }

    const currentTime = yield* DateTime.now;

    return Todo.make({
      ...todo,
      completed: true,
      updatedAt: currentTime,
    });
  });
};
