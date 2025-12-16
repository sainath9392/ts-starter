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
