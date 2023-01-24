import { useState } from "react";
import './NewPost.css';

export const NewPost = props => {
  const [form, setForm] = useState({post: ''});

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 新規投稿作成
  const createPost = async () => {
    props.setDonePost(false);
    try {
      const rsp = await fetch(`${process.env.REACT_APP_API_URL}/threads/${props.threadId}/posts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await rsp.json();
      console.log(data);
      props.setDonePost(true);
    } catch(err) {
      console.error(err);
    }
  };

  const handleClick = e => {
    e.preventDefault();
    if (form.post) {
      createPost();
      setForm({post: ''});
    }
  };

  return (
    <div className="post-form">
      <textarea name="post" placeholder="投稿をしよう" value={form.post} onChange={handleChange}></textarea>
      <button onClick={handleClick}>投稿</button>
    </div>
  );
};
