import React from 'react';

const App = () => {
  const handleLodashClick = async () => {
    const AWS = await import(/* webpackChunkName: 'aws' */'aws-sdk/global');
    console.log(AWS);
  };

  return (
    <div>
      Hello from App!
      <button onClick={handleLodashClick}>Lodash</button>
    </div>
  );
};

export default App;