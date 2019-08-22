import React from 'react';

import './index.css';

export default () => (
  <footer className='footer bg-primary text-light mt-1 p-2 text-center'>
    <span className='footer-credit'>
      Made by
      <a
        className='footer-link text-light'
        href='http://jesuodz.github.io'
        target='_blank'
        rel='noopener noreferrer'
      >
        Jesuodz
      </a>
      {'  '}
      &copy; { new Date().getFullYear() }
    </span>
  </footer>
);
