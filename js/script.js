const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;
const TETROMINO_NAMES = ['O', 'J', 'L', 'S', 'F', 'I', 'T', 'X'];

const TETROMINOES = {
  O: [
    [1, 1],
    [1, 1],
  ],
  J: [
    [0, 1, 0, 0],
    [0, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  L: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  S: [
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
  ],
  F: [
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ],

  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  X: [
    [0, 0, 1, 0],
    [0, 1, 1, 1],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
  ],
};

function convertPositionToIndex(row, column) {
  return row * PLAYFIELD_COLUMNS + column;
}

let playfield;
let tetromino;

function generatePlayField() {
  for (let i = 0; i < PLAYFIELD_COLUMNS * PLAYFIELD_ROWS; i += 1) {
    const div = document.createElement('div');
    document.querySelector('.grid').append(div);
  }
  playfield = new Array(PLAYFIELD_ROWS)
    .fill()
    .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
}
function getRandomTetrominoIndex(maxValue) {
  return Math.round(Math.random() * (maxValue - 0) + 0);
}
function generateTetromino() {
  const tetrominoIndex = getRandomTetrominoIndex(TETROMINO_NAMES.length - 1);
  const name = TETROMINO_NAMES[tetrominoIndex];
  console.log(name, tetrominoIndex);
  console.log(TETROMINO_NAMES.length);
  const matrix = TETROMINOES[name];
  tetromino = {
    name,
    matrix,
    row: 0,
    column: Math.floor((PLAYFIELD_COLUMNS - matrix[0].length) / 2),
  };
}

generatePlayField();
generateTetromino();

const cells = document.querySelectorAll('.grid div');

function drawPlayField() {
  for (let row = 0; row < PLAYFIELD_ROWS; row += 1) {
    for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
      const name = playfield[row][column];
      const cellIndex = convertPositionToIndex(row, column);
      cells[cellIndex].classList.add(name);
    }
  }
}

function drawTetromino() {
  const name = tetromino.name;
  const tetrominoMatrixSize = tetromino.matrix.length;

  for (let row = 0; row < tetrominoMatrixSize; row += 1) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      if (!tetromino.matrix[row][column]) continue;
      const cellIndex = convertPositionToIndex(
        tetromino.row + row,
        tetromino.column + column,
      );

      cells[cellIndex].classList.add(name);
    }
  }
}

// drawTetromino();
// drawPlayField();

function draw() {
  cells.forEach(cell => cell.removeAttribute('class'));
  drawTetromino();
  drawPlayField();
}

draw();

function rotateTetromino() {
  const originalMatrix = tetromino.matrix;
  const rotatedMatrix = [];

  for (let i = 0; i < originalMatrix[0].length; i++) {
    rotatedMatrix.push([]);
    for (let j = 0; j < originalMatrix.length; j++) {
      rotatedMatrix[i].push(originalMatrix[j][i]);
    }
  }
  rotatedMatrix.forEach(row => row.reverse());
  tetromino.matrix = rotatedMatrix;
}

document.addEventListener('keydown', onKeyDown);
function onKeyDown(e) {
  switch (e.key) {
    case 'ArrowUp':
      rotateTetromino();
      break;
    case 'ArrowDown':
      moveTetrominoDown();
      break;
    case 'ArrowLeft':
      moveTetrominoLeft();
      break;
    case 'ArrowRight':
      moveTetrominoRight();
      break;
  }

  draw();
}

function moveTetrominoDown() {
  tetromino.row += 1;
}
function moveTetrominoLeft() {
  tetromino.column -= 1;
}
function moveTetrominoRight() {
  tetromino.column += 1;
}
