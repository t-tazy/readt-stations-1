import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export const Header = () => {
  return (
    <header>
      <h1 id="app-title">掲示板</h1>
      <Link to="/thread/new">スレッドをたてる</Link>
    </header>
  );
};
