import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
      {threads.map(thread => {
        return (
          <div className="thread" key={thread.id}>
          <p className="thread-title">{thread.title}</p>
          </div>
        );
      })}
    </div>
  );
};
