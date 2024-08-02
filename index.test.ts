import { processInput } from "./index";

// Create a test to check the final positions of the robots
test("Robot 1 and Robot 2 final positions", () => {
  const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

  // Mock console.log to capture the output
  const consoleSpy = jest.spyOn(console, "log").mockImplementation();

  // Run the function
  processInput(input);

  // Check the captured output
  expect(consoleSpy).toHaveBeenCalledWith(`1 3 N`);
  expect(consoleSpy).toHaveBeenCalledWith(`5 1 E`);

  // Restore the original console.log
  consoleSpy.mockRestore();
});
