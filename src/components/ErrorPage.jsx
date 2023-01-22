import { useRouteError } from "react-router-dom";
import './ErrorPage.css';

export const ErrorPage = () => {
  // 投げられたエラーを捕捉
  const err = useRouteError();
  console.error(err);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{err.statusText || err.message}</i>
      </p>
    </div>
  );
};
