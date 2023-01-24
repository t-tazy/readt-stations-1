import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import './ThreadList.css';

export const ThreadList = () => {
  const [threads, setThreads] = useState([]);
  const [searchParams] = useSearchParams();
  const offset = searchParams.get("offset") ?? "";

  async function fetchThreads(offset) {
    try {
      const rsp = await fetch(
        `${process.env.REACT_APP_API_URL}/threads?offset=${offset}`
      );
      const data = await rsp.json();
      setThreads(data);
      console.log(data)
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchThreads(offset);
  }, []);

  return (
    <div className="thread-container">
      <h1>新着スレッド</h1>
      <ul>
        {threads.map(thread => {
          return (
            <li key={thread.id}>
              <Link to={`/thread/${thread.id}`} state={{ title: thread.title }} >
                <p className="thread">{thread.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
