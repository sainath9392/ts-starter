// src/collection.ts

// We need to import 'Task' here to use it in the function arguments below
import { Task, TaskCollection, TaskStats, Priority } from "./types.js";

// start a fresh collection
export function createCollection(tasks: Task[] = []): TaskCollection {
  return {
    tasks,
    metadata: {
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      lastModified: new Date(),
    },
  };
}

// update the counts whenever we touch the list
export function refreshMetadata(collection: TaskCollection): TaskCollection {
  return {
    ...collection,
    metadata: {
      total: collection.tasks.length,
      completed: collection.tasks.filter((t) => t.completed).length,
      lastModified: new Date(),
    },
  };
}

// crunch the numbers
export function getStats(collection: TaskCollection): TaskStats {
  const { tasks } = collection;

  // simple helper to count stuff
  const countBy = (fn: (t: Task) => string) => {
    const counts: Record<string, number> = {};
    for (const task of tasks) {
      const key = fn(task);
      counts[key] = (counts[key] || 0) + 1;
    }
    return counts;
  };

  return {
    // we use 'as Record...' to tell TS we know what we're doing with the keys
    byPriority: countBy((t) => t.priority) as Record<Priority, number>,
    byStatus: countBy((t) => (t.completed ? "done" : "pending")),
    averageAge: 0,
  };
}
