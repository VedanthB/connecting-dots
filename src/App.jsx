import { useState, useEffect } from 'react';

const createRowsArr = (rowsNumber) => {
  let result = [];

  for (let i = 0; i < rowsNumber; i += 1) {
    const element = i;
    result = [...result, element];
  }

  return result;
};

const createColsArr = (colsNumber) => {
  let result = [];

  for (let i = 0; i < colsNumber; i++) {
    const element = i;
    result = [...result, element];
  }

  return result;
};

const findLastEmptyCell = (col) => {
  const cells = document.querySelectorAll(`[data-col="${col}"]`);

  for (let i = cells.length - 1; i >= 0; i--) {
    let cell = cells[i];
    if (cell.classList.contains('empty')) {
      return cell;
    }
  }

  return null;
};

const App = () => {
  const [rowsNumber, setRowsNumber] = useState(5);
  const [colsNumber, setColsNumber] = useState(6);
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [player, setPlayer] = useState('Red');
  const [player1, setPlayer1] = useState('Player One');
  const [player2, setPlayer2] = useState('Player Two');

  const handleOnMouseEnter = (e) => {
    const colIndex = e.target.dataset.col;

    const lastEmptyCell = findLastEmptyCell(colIndex);

    lastEmptyCell.classList.add(`next${player}`);
  };

  const handleOnMouseLeave = () => {
    const cols = document.querySelectorAll(`.col`);

    cols.forEach((col) => {
      col.classList.remove(`next${player}`);
    });
  };

  const checkForWinner = (row, col) => {
    function getCell(i, j) {
      return document.querySelector(`.col[data-row='${i}'][data-col='${j}']`);
    }

    function checkDirection(direction) {
      let total = 0;
      let i = Number(row) + direction.i;
      let j = Number(col) + direction.j;

      let next = getCell(i, j);

      while (
        i >= 0 &&
        i < rows.length &&
        j >= 0 &&
        j < cols.length &&
        next.getAttribute('player') === player
      ) {
        total++;
        i += direction.i;
        j += direction.j;
        next = getCell(i, j);
      }

      console.log(total);

      return total;
    }

    function checkWin(directionA, directionB) {
      const total = 1 + checkDirection(directionA) + checkDirection(directionB);
      if (total >= 4) {
        return player;
      } else {
        return null;
      }
    }

    function checkDiagonalBLtoTR() {
      return checkWin({ i: 1, j: -1 }, { i: 1, j: 1 });
    }

    function checkDiagonalTLtoBR() {
      return checkWin({ i: 1, j: 1 }, { i: -1, j: -1 });
    }

    function checkVerticals() {
      return checkWin({ i: -1, j: 0 }, { i: 1, j: 0 });
    }

    function checkHorizontals() {
      return checkWin({ i: 0, j: -1 }, { i: 0, j: 1 });
    }

    return (
      checkVerticals() ||
      checkHorizontals() ||
      checkDiagonalBLtoTR() ||
      checkDiagonalTLtoBR()
    );
  };

  const handleClick = (e) => {
    const colIndex = e.target.dataset.col;

    const lastEmptyCell = findLastEmptyCell(colIndex);

    lastEmptyCell.classList.remove('empty');

    lastEmptyCell.classList.add(player);

    lastEmptyCell.setAttribute('player', player);

    let nextPlayer = player === 'Red' ? 'Black' : 'Red';

    setPlayer(nextPlayer);

    let winner = checkForWinner(
      lastEmptyCell.dataset.row,
      lastEmptyCell.dataset.col
    );

    if (winner) {
      // eslint-disable-next-line no-restricted-globals
      const restart = confirm(
        `Game Over! Player ${
          player === 'Red' ? player1 : player2
        } has won! Do you want to restart `
      );

      if (restart) {
        window.location.reload();
      }
    }
  };

  return (
    <div className="app">
      <div className="actions">
        <div>
          <input
            type="text"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          />
          <input
            type="text"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
          />
        </div>
        <input
          type="number"
          min={5}
          max={50}
          value={rowsNumber}
          onChange={(e) => setRowsNumber(e.target.value)}
        />
        <input
          type="number"
          min={6}
          max={60}
          value={colsNumber}
          onChange={(e) => setColsNumber(e.target.value)}
        />

        <button
          onClick={() => {
            setRows(createRowsArr(rowsNumber));

            setCols(createColsArr(colsNumber));
          }}
        >
          {' '}
          start game{' '}
        </button>
      </div>

      <div className="board">
        {rows &&
          rows.map((i) => {
            return (
              <div key={i} className="row">
                {cols.map((j) => {
                  return (
                    <div
                      key={j}
                      data-col={j}
                      data-row={i}
                      onMouseEnter={handleOnMouseEnter}
                      onMouseLeave={handleOnMouseLeave}
                      onClick={handleClick}
                      className="col empty"
                    ></div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default App;
