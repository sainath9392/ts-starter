export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

// src/types.ts (Add this to the end of the file)

export interface TaskCollection {
  tasks: Task[];
  metadata: {
    total: number;
    completed: number;
    lastModified: Date;
  };
}

export interface TaskStats {
  byPriority: Record<Priority, number>;
  byStatus: Record<string, number>;
  averageAge: number;
}

export type TaskStatus = "pending" | "in-progress" | "completed";

// Utility type: extracting the priority type from the interface so we don't repeat ourselves
export type Priority = Task["priority"];
