import React from 'react';

function App() {
  return (
    <div className="App">
      { JSON.stringify(process.env) }
    </div>
  );
}

export default App;
