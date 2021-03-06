import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FilmPage } from './filmPage';
import { FilmsPage } from './films';
import { HomePage } from './home';

export function Routing() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/top" element={<FilmsPage mode="top" />} />
      <Route path="/film/:filmID" element={<FilmPage />} />
    </Routes>
  );
}
