import { Task, TaskStats, Priority } from "./types.js";
import { createTask } from "./operations.js";

export class TaskManager {
  // 'private' means only this class can touch this list directly.
  // Outsiders must use our methods.
  private tasks: Task[] = [];

  constructor(initialTasks: Task[] = []) {
    this.tasks = initialTasks;
  }

  // Add a task (user doesn't need to provide ID or Date)
  add(title: string, priority: Priority = "medium"): Task {
    const newTask = createTask(title, priority);
    this.tasks.push(newTask);
    return newTask;
  }

  // Update a task (e.g., just change title, or just mark complete)
  update(id: string, updates: Partial<Task>): Task | undefined {
    const index = this.tasks.findIndex((t) => t.id === id);

    if (index === -1) return undefined;

    // Merge old task with new updates
    this.tasks[index] = { ...this.tasks[index], ...updates };
    return this.tasks[index];
  }

  // Delete a task
  delete(id: string): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return this.tasks.length < initialLength; // Returns true if something was actually deleted
  }

  // Get all tasks (optional filter)
  getTasks(filterByStatus?: boolean): Task[] {
    if (filterByStatus === undefined) {
      return this.tasks;
    }
    return this.tasks.filter((t) => t.completed === filterByStatus);
  }

  // Calculate stats on the fly
  getStats(): TaskStats {
    const stats: TaskStats = {
      byPriority: { high: 0, medium: 0, low: 0 },
      byStatus: { completed: 0, pending: 0 },
      averageAge: 0,
    };

    this.tasks.forEach((t) => {
      // Count priorities
      stats.byPriority[t.priority]++;

      // Count status
      const statusKey = t.completed ? "completed" : "pending";
      stats.byStatus[statusKey]++;
    });

    return stats;
  }
}
