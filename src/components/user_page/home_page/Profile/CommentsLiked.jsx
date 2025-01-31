import { useSelector } from "react-redux";
import "./small.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CommentsLiked() {
  const navigate = useNavigate()
  const userLikes = useSelector((state)=>state.user.info.liked)
  const [comments, setcomments] = useState([]);
  const [games,setGames] = useState([])
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/user/comments`)
      .then((data) => data.json())
      .then((res) => {setcomments(res)});
    fetch(`${import.meta.env.VITE_SERVER_URL}/user/all_Games`)
      .then((data) => data.json())
      .then((res) => {setGames(res)});
  }, []);

  return (
    <div className="comments-section">

      <div className="header">
      <h1>I liked: </h1>
      </div>
      {
        userLikes.length == 0
        ? <span>You haven't liked anything</span>
        : comments.filter((c)=> userLikes.includes(c.comment_id)).map((comment) => (
        <div  className="comment-card" onClick={()=>{navigate('/user_interface/game/'+comment.game_id)}}>
        {games.filter((g)=>g.id == comment.game_id).map((game)=>(
          <img
          src={game.cover}
          className="game-thumbnail"
          />
        ))}
        
          <div className="comment-details">

          {games.filter((g)=>g.id == comment.game_id).map((game)=>(
            <h3 className="game-title">{game.name}</h3>
          ))}
            <p className="comment-text">"{comment.text}"</p>
          </div>
        </div>
      ))}
    </div>
  );
}

