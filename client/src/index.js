import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const App = () => (
  <div className="App">
    <Router>
      <div className="App-body">

        <section className="holy-grail-content">
          <p>Main content of the page. Just a test.</p>
        </section>

        <Sidebar />

      </div>
    </Router>
    <Footer />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
