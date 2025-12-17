function greet(name: string) {
  return `Hello, ${name}!`;
}

console.log(greet("TypeScript"));

// drill2
const scores: number[] = [10, 20];
const firstScore = scores[0];
const impossibleScore = scores[100];

// module hygiene drill

import { UserSchema } from "./validate";

const unknownData = {
  id: "123", // FAIL: Not a UUID
  email: "not-an-email", // FAIL: Invalid email
  age: 10, // FAIL: Too young
};

try {
  // This will throw an error because the data doesn't match the schema
  const user = UserSchema.parse(unknownData);
  console.log("User is valid!", user);
} catch (error) {
  console.error("Validation failed:", error);
}

//drill5

import dayjs from "dayjs";
// Notice the 'type' keyword here:
import type { ConfigType } from "dayjs";

function formatDate(date: ConfigType): string {
  return dayjs(date).format("YYYY-MM-DD");
}

console.log(formatDate(new Date()));

import { Task } from "./types.js";

// 1. Manually creating a task to test our Interface
const testTask: Task = {
  id: "1",
  title: "Complete the TypeScript Course",
  completed: false,
  priority: "high",
  createdAt: new Date(),
};

// 2. Log it to verify
console.log("Current Task:", testTask);

////////////////////////////////////////////////

import { createTask, markCompleted, filterByStatus, sortByPriority } from "./operations.js";

// 1. Create a list of tasks
const tasks: Task[] = [
  createTask("Pay bills", "high"),
  createTask("Walk the dog", "low"),
  createTask("Learn TypeScript"), // defaults to medium
];

console.log("--- Initial List ---");
console.log(tasks);

// 2. Mark the first task as completed
// Notice we update the array with the new version of the task

tasks[0] = markCompleted(tasks[0]);

console.log("\n--- After Completing First Task ---");
console.log(tasks);

// 3. Filter only pending tasks
const pendingTasks = filterByStatus(tasks, false);
console.log("\n--- Pending Tasks Only ---");
console.log(pendingTasks);

// 4. Sort by priority
// Should be: Pay bills (High) -> Learn TypeScript (Medium) -> Walk dog (Low)
const sortedTasks = sortByPriority(tasks);
console.log("\n--- Sorted by Priority ---");
console.log(sortedTasks);
