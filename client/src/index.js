import React from 'react';
import ReactDOM from 'react-dom';

import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const App = () => (
  <div className="App">
    <div className="App-body">
    </div>
    <Footer />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
