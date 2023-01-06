import React from 'react';
import Header from './components/header-component/Header'
import Meals from './components/meals-componets/Meals';

function App() {
  return (
    <div className="App">
      <>
        <Header/>
        <main>
          <Meals />
        </main>
      </>
    </div>
  );
}

export default App;
