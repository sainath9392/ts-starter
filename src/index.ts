function greet(name: string) {
  return `Hello, ${name}!`;
}

console.log(greet("TypeScript"));

// Add this line
const scores: number[] = [10, 20];
const firstScore = scores[0];
const impossibleScore = scores[100];

// Hover over 'impossibleScore'.
// Because of "noUncheckedIndexedAccess": true,
// TypeScript will warn you that this might be 'undefined'.
