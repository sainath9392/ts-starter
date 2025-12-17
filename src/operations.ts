import { Task, Priority } from "./types.js";

/**
 * Creates a new task object.
 * Notice the default parameter: priority is 'medium' if not provided.
 */
export function createTask(title: string, priority: Priority = "medium"): Task {
  return {
    id: crypto.randomUUID(), // Built-in Node.js random ID generator
    title,
    completed: false,
    priority,
    createdAt: new Date(),
  };
}

/**
 * Returns a NEW task object with completed set to true.
 * We do not modify the original object (Immutability pattern).
 */
export function markCompleted(task: Task): Task {
  return { ...task, completed: true };
}

/**
 * Filters tasks based on their completion status.
 */
export function filterByStatus(tasks: Task[], isCompleted: boolean): Task[] {
  return tasks.filter((task) => task.completed === isCompleted);
}

/**
 * Sorts tasks: High -> Medium -> Low.
 */
export function sortByPriority(tasks: Task[]): Task[] {
  // We map priorities to numbers to make math easy
  const weight: Record<Priority, number> = {
    high: 3,
    medium: 2,
    low: 1,
  };

  // [...tasks] creates a shallow copy so we don't mutate the original array
  return [...tasks].sort((a, b) => {
    return weight[b.priority] - weight[a.priority];
  });
}
