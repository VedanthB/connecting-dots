import { useState } from 'react';

const createRowsArr = () => {
  let result = [];

  for (let i = 0; i < 6; i += 1) {
    const element = i;
    result = [...result, element];
  }

  return result;
};

const createColsArr = () => {
  let result = [];

  for (let i = 0; i < 7; i += 1) {
    const element = i;
    result = [...result, element];
  }

  return result;
};

const App = () => {
  const [rows, setRows] = useState(createRowsArr());
  const [cols, setCols] = useState(createColsArr());

  console.log(rows, cols, setRows, setCols);

  return (
    <div className="App">
      <div className="connectBoard">
        {rows.map((i) => {
          return (
            <div key={i} className="row">
              {cols.map((j) => {
                return (
                  <div key={j} className="col empty">
                    col
                  </div>
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
