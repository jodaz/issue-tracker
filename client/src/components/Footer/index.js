import React from 'react';

import './index.css';

export default () => (
  <footer className='footer bg-warning text-dark mt-1 p-3 text-center'>
    <span className='footer-credit'>
      Made by
      <a
        className='footer-link'
        href='http://jesuodz.github.io'
      >
        Jesuodz
      </a>
      {'  '}
      &copy; { new Date().getFullYear() }
    </span>
  </footer>
);
