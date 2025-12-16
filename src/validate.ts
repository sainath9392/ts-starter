// src/validate.ts
import { z } from "zod";

// 1. Define the Schema (Runtime check)
export const UserSchema = z.object({
  id: z.string().uuid(), // Must be a valid UUID
  email: z.string().email(), // Must look like an email
  age: z.number().min(18), // Must be 18 or older
});

// 2. Infer the Type (Compile-time check)
// This extracts the TypeScript type directly from the schema above.
// You never have to write the interface manually!
export type User = z.infer<typeof UserSchema>;
