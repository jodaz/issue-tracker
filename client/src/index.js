import React from 'react';
import ReactDOM from 'react-dom';

import Footer from './components/Footer';
import Header from './components/Header';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const App = () => (
  <div className="App">
    <div className="App-body">
      <Header />
    </div>
    <Footer />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
