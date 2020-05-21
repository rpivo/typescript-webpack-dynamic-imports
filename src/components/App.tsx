import React from 'react';

const App = () => {
  const handleClick = async () => {
    const AWS = await import(/* webpackChunkName: 'aws' */'aws-sdk/global');
    console.log(AWS);
  };

  return (
    <div>
      Hello from App!
      <button onClick={handleClick}>Import AWS</button>
    </div>
  );
};

export default App;