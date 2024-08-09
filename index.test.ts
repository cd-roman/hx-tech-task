import { processInput } from "./index";

// Create a test to check the final positions of the robots
test("Robots final positions", () => {
  const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
`;

  // Run the function and get the result
  const robots = processInput(input);

  // Check the final positions and directions of the robots
  expect(robots[0].coords).toEqual([1, 3]);
  expect(robots[0].direction).toBe("N");

  expect(robots[1].coords).toEqual([5, 1]);
  expect(robots[1].direction).toBe("E");
});

// Test for invalid grid size
test("Invalid grid size", () => {
  const input = `A B
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
`;

  expect(() => processInput(input)).toThrow("Invalid grid size.");
});

// Test for invalid robot data format
test("Invalid robot data format", () => {
  const input = `5 5
1 2 X
LMLMLMLMM
3 3 E
MMRMMRMRRM
`;

  expect(() => processInput(input)).toThrow("Invalid robot data format.");
});

// Test for invalid commands
test("Invalid commands", () => {
  const input = `5 5
1 2 N
LMLMLMLMMX
3 3 E
MMRMMRMRRM
`;

  expect(() => processInput(input)).toThrow("Invalid command");
});
