import { Effect, Schedule } from "effect";

export const retryWithFixedDelay = (retries: number, delayMs: number) =>
  Schedule.intersect(Schedule.recurs(retries), Schedule.spaced(`${delayMs} millis`));

export const withRetryPolicy =
  <A, E, R>(retries = 3, delayMs = 500) =>
  (effect: Effect.Effect<A, E, R>) =>
    effect.pipe(Effect.retry(retryWithFixedDelay(retries, delayMs)));
