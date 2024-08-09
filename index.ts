// THE MARS ROVER KATA - technical task

// Define the type of the grid size, coordinates, and direction
type GridSize = [number, number];
type Coords = [number, number];
type Command = "L" | "R" | "M";
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
  commands: Command[];
} {
  const lines = input.trim().split("\n");

  const [gridX, gridY] = parseGridSize(lines[0]);
  const gridSize: GridSize = [gridX, gridY];

  const robots = parseRobotsData(lines.slice(1));

  const commands = parseCommands(lines);

  return { gridSize, robots, commands };
}

function parseGridSize(line: string): [number, number] {
  const [gridX, gridY] = line.split(" ").map(Number);
  if (isNaN(gridX) || isNaN(gridY) || gridX <= 0 || gridY <= 0) {
    throw new Error("Invalid grid size.");
  }
  return [gridX, gridY];
}

function parseRobotsData(lines: string[]): Robot[] {
  const robots: Robot[] = [];
  for (let i = 0; i < lines.length; i += 2) {
    const [x, y, direction] = lines[i].split(" ");
    const xNum = Number(x);
    const yNum = Number(y);

    if (!directions.includes(direction as Direction)) {
      throw new Error("Invalid robot data format.");
    }

    robots.push({
      coords: [xNum, yNum],
      direction: direction as Direction,
    });
  }
  return robots;
}

function parseCommands(lines: string[]): Command[] {
  return lines
    .filter((_, i) => i % 2 === 0 && i !== 0)
    .map((command) => {
      const validCommands = ["L", "R", "M"];
      const isValidCommand = [...command].every((char) =>
        validCommands.includes(char)
      );

      if (!isValidCommand) {
        throw new Error(`Invalid command found: ${command}`);
      }

      return command as Command;
    });
}

const leftTurnMap: { [key in Direction]: Direction } = {
  N: "W",
  E: "N",
  S: "E",
  W: "S",
};

const rightTurnMap: { [key in Direction]: Direction } = {
  N: "E",
  E: "S",
  S: "W",
  W: "N",
};

const directionMap: { [key: string]: (dir: Direction) => Direction } = {
  L: (dir: Direction) => leftTurnMap[dir],
  R: (dir: Direction) => rightTurnMap[dir],
};

const moveMap: {
  [key in Direction]: (coords: [number, number], gridSize: GridSize) => void;
} = {
  N: (coords: [number, number], gridSize: GridSize) => {
    if (coords[1] < gridSize[1]) coords[1]++;
  },
  E: (coords: [number, number], gridSize: GridSize) => {
    if (coords[0] < gridSize[0]) coords[0]++;
  },
  S: (coords: [number, number], gridSize: GridSize) => {
    if (coords[1] > 0) coords[1]--;
  },
  W: (coords: [number, number], gridSize: GridSize) => {
    if (coords[0] > 0) coords[0]--;
  },
};

function moveRobot(
  gridSize: GridSize,
  robot: Robot,
  commands: string,
  robotIndex: number
) {
  console.log(`Starting to move robot ${robotIndex + 1}`);
  for (const command of commands) {
    if (command === "L" || command === "R") {
      robot.direction = directionMap[command](robot.direction);
    } else if (command === "M") {
      moveMap[robot.direction](robot.coords, gridSize);
    }
  }
  console.log(`Finished moving robot ${robotIndex + 1}`);
}

// Process the input string and output the final positions of the robots
export function processInput(input: string) {
  const { gridSize, robots, commands } = parseInput(input);

  robots.forEach((robot, robotIndex) => {
    moveRobot(gridSize, robot, commands[robotIndex], robotIndex);
  });

  return robots;
}
