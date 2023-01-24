import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { NewPost } from "./NewPost";
import './PostList.css';

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [donePost, setDonePost] = useState(false);
  const {threadId} = useParams(); // パスパラメータ取得
  const [searchParams] = useSearchParams();
  const offset = searchParams.get("offset") ?? ""; // クエリパラメータ取得
  const location = useLocation();
  // パスを手打ちした場合
  const {title} = location.state ?? {title: "タイトルを表示できません"};

  // 投稿一覧取得
  const fetchPosts = async () => {
    try{
      const rsp = await fetch(`${process.env.REACT_APP_API_URL}/threads/${threadId}/posts?offset=${offset}`);
      const data = await rsp.json();
      setPosts(data.posts); // 投稿が存在しない場合、postsはnull
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [donePost]);

  return (
    <div>
      <p className="thread-title">{title}</p>
      <div className="posts-container">
        <ul className="posts">
          {posts ? posts.map(post => {
            return (
              <li className="post" key={post.id}>
                <p className="post-content">{post.post}</p>
              </li>
            );
          }) : <p>投稿がありません</p>}
        </ul>
        <NewPost threadId={threadId} setDonePost={setDonePost} />
      </div>
    </div>
  );
};
