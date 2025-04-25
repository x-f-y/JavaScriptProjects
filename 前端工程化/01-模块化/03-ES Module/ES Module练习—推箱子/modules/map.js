import { BLANK, PLAYER, WALL, BOX } from './variables.js';

export const content = [
  [BLANK, BLANK, WALL, WALL, WALL, WALL, WALL, BLANK, BLANK],
  [BLANK, BLANK, WALL, BLANK, PLAYER, BLANK, WALL, BLANK, BLANK],
  [BLANK, BLANK, WALL, BLANK, BOX, BLANK, WALL, BLANK, BLANK],
  [WALL, WALL, WALL, BLANK, BLANK, BLANK, WALL, WALL, WALL],
  [WALL, BLANK, BLANK, BLANK, BOX, BLANK, BLANK, BLANK, WALL],
  [WALL, BLANK, BOX, BOX, BOX, BOX, BOX, BLANK, WALL],
  [WALL, BLANK, BLANK, BLANK, BOX, BLANK, BLANK, BLANK, WALL],
  [WALL, WALL, BLANK, BOX, BOX, BOX, BLANK, WALL, WALL],
  [BLANK, WALL, BLANK, BLANK, BLANK, BLANK, BLANK, WALL, BLANK],
  [BLANK, WALL, BLANK, BLANK, BOX, BLANK, BLANK, WALL, BLANK],
  [BLANK, WALL, BLANK, BLANK, BLANK, BLANK, BLANK, WALL, BLANK],
  [BLANK, WALL, WALL, WALL, WALL, WALL, WALL, WALL, BLANK]
];

export const correct = [
  { row: 3, col: 4 },
  { row: 4, col: 4 },
  { row: 5, col: 2 },
  { row: 5, col: 3 },
  { row: 5, col: 4 },
  { row: 5, col: 5 },
  { row: 5, col: 6 },
  { row: 6, col: 4 },
  { row: 7, col: 4 },
  { row: 8, col: 4 },
  { row: 9, col: 4 },
  { row: 10, col: 4 }
];