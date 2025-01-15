import { IBehaviorItem, IBehaviorRecord } from '../types/behavior.js';

export function UseBehavior<T extends keyof IBehaviorRecord>(
  behaviorName: T,
  options?: Partial<IBehaviorRecord[T]>,
): IBehaviorItem {
  return { [behaviorName]: options };
}
