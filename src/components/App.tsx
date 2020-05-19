import React from 'react';

const App = () => {
  const handleLodashClick = async () => {
    const obj = {
      foo: "bar",
    };
    const _ = await import(/* webpackChunkName: "lodash" */"lodash");
    const val = _.get(obj, "foo", "baz");
    console.log(val);
  };

  return (
    <div>
      Hello from App!
      <button onClick={handleLodashClick}>Lodash</button>
    </div>
  );
};

export default App;