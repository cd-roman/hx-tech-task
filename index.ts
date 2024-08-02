// THE MARS ROVER KATA - technical task

// Define the type of the grid size, coordinates, and direction
type GridSize = [number, number];
type Coords = [number, number];
type Direction = "N" | "E" | "S" | "W";

// Define the Robot interface
interface Robot {
  coords: Coords;
  direction: Direction;
}

// Define the directions in a clockwise order
const directions: Direction[] = ["N", "E", "S", "W"];

// Parse the input string and return the grid size and robots with their coordinates and directions
function parseInput(input: string): {
  gridSize: GridSize;
  robots: Robot[];
} {
  const lines = input.trim().split("\n");
  const totalLines = lines.length;

  if (totalLines % 2 !== 1) {
    throw new Error("Invalid input format. Expected an odd number of lines.");
  }

  const [gridX, gridY] = lines[0].split(" ").map(Number);
  if (isNaN(gridX) || isNaN(gridY) || gridX <= 0 || gridY <= 0) {
    throw new Error("Invalid grid size.");
  }
  const gridSize: GridSize = [gridX, gridY];

  const robots: Robot[] = [];
  for (let i = 1; i < totalLines; i += 2) {
    const [x, y, direction] = lines[i].split(" ");
    const xNum = Number(x);
    const yNum = Number(y);

    if (
      isNaN(xNum) ||
      isNaN(yNum) ||
      !directions.includes(direction as Direction)
    ) {
      throw new Error("Invalid robot data format.");
    }

    robots.push({
      coords: [xNum, yNum],
      direction: direction as Direction,
    });
  }

  return { gridSize, robots };
}

// Move the robot based on the commands provided
function moveRobot(robot: Robot, commands: string, gridSize: GridSize) {
  const directionMap: { [key: string]: (dir: Direction) => Direction } = {
    L: (dir: Direction) => directions[(directions.indexOf(dir) + 3) % 4],
    R: (dir: Direction) => directions[(directions.indexOf(dir) + 1) % 4],
  };

  const moveMap: { [key in Direction]: (coords: [number, number]) => void } = {
    N: (coords: [number, number]) => {
      if (coords[1] < gridSize[1]) coords[1]++;
    },
    E: (coords: [number, number]) => {
      if (coords[0] < gridSize[0]) coords[0]++;
    },
    S: (coords: [number, number]) => {
      if (coords[1] > 0) coords[1]--;
    },
    W: (coords: [number, number]) => {
      if (coords[0] > 0) coords[0]--;
    },
  };

  for (const command of commands) {
    if (command === "L" || command === "R") {
      robot.direction = directionMap[command](robot.direction);
    } else if (command === "M") {
      moveMap[robot.direction](robot.coords);
    }
  }
}

// Process the input string and output the final positions of the robots
export function processInput(input: string) {
  const { gridSize, robots } = parseInput(input);
  const commands = input
    .trim()
    .split("\n")
    .filter((_, i) => i % 2 === 0 && i !== 0);

  robots.forEach((robot, index) => {
    moveRobot(robot, commands[index], gridSize);
    console.log(`${robot.coords[0]} ${robot.coords[1]} ${robot.direction}`);
  });
}
