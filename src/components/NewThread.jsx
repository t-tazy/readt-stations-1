import { useState } from 'react';
import { Link } from 'react-router-dom';
import './NewThread.css';

export const NewThread = () => {
  const [form, setForm] = useState({
    title: '',
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  async function createThread() {
    try {
      const rsp = await fetch(`${process.env.REACT_APP_API_URL}/threads`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await rsp.json();
      console.log(data);
    } catch(err) {
      console.error(err);
    }
  }

  const handleClick = e => {
    e.preventDefault();
    if (form.title) {
      createThread();
      setForm({title: ''});
    }
  };

  return (
    <div className="new-thread-container">
      <h1>スレッド新規作成</h1>
      <form>
        <input type="text" name="title" value={form.title} required placeholder="スレッドタイトル" onChange={handleChange} />
        <div>
          <Link to="/">TOPへ戻る</Link>
          <button onClick={handleClick}>作成</button>
        </div>
      </form>
    </div>
  );
};
