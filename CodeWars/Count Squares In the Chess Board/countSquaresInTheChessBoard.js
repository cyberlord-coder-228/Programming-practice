'use strict';

let COUNTER = 0;

/**
  * Maps every occurence of a pack of ones (NxN squre filled with ones),
  * to a 1 in a new matrix, where N is the iteration plus one.
  * Also writes to global variable how many ones is in the new matrix,
  * counting happens with main cycle to save resources
  */
function minimizeBoard(matrix) {
  COUNTER = 0;

  const lengthThatICareAbout = matrix.length - 1;

  const minimizedMatrix = Array(lengthThatICareAbout);
  for (let i = 0; i < lengthThatICareAbout; i++) {
    minimizedMatrix[i] = Array(lengthThatICareAbout);
    for (let j = 0; j < lengthThatICareAbout; j++) {
      if (
        matrix[i][j] && matrix[i][j+1] && matrix[i+1][j] && matrix[i+1][j+1]
      ) {
        minimizedMatrix[i][j] = 1;
        COUNTER++;
      } else {
        minimizedMatrix[i][j] = 0;
      }
    }
  }

  return minimizedMatrix;
}

/** Main function */
function count(chessBoard) {
  const results = {};

  for (let i = 2; ; i++) {
    chessBoard = minimizeBoard(chessBoard);

    if (COUNTER) results[i] = COUNTER;
    else break;
  }

  return results;
}

console.log(
    count(
        [
          [0, 1, 1, 1, 1],
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1],
          [0, 1, 1, 0, 1],
          [1, 1, 1, 1, 1],
        ],
    ),
);
