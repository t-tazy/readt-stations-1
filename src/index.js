import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { ThreadList } from './components/ThreadList';
import { NewThread } from './components/NewThread';
import { ErrorPage } from './components/ErrorPage';
import { PostList } from './components/PostList';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route path="" element={<ThreadList />} />
      <Route path="thread/new" element={<NewThread />} />
      <Route path="thread/:threadId" element={<PostList />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
