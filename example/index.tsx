import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useQuery } from '../dist';

function Thing() {
  return <h1>Hello</h1>;
}
const App = () => {
  const data = useQuery(['(min-width:900px)', '(max-width:1000px)']);
  console.log(useQuery(['(max-height: 600px)']));
  console.log('data2:', data);
  return (
    <div>
      <Thing />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
