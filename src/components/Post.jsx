import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useEffect, useState } from "react";
import { api } from "../services/api/client";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";

export function Post({ author, publishedAt, content }) {

  const [data, setData] = useState([{
    name: "Gabriel Coelho",
    id: 3253,
    pic: "http://github.com/bielcoelho.png"
  }])

  useEffect(() => {

    const fetchData = async () => {
      const request = await api.get('?results=10')

      const dados = request.data.results.map(item => {
        return {
          id: item.location.postcode,
          pic: item.picture.medium,
          country: item.location.country,
          name: `${item.name.first} ${item.name.last}`
        }
      })

      setData(dados)
    }

    fetchData()
  }, []);

  function randomizeUser(data) {
    const howManyUsers = data.length
    const randomIndex = Math.floor(Math.random() * howManyUsers)

    return users[randomIndex]
  }

  const publishedDateFormatted = format(
    publishedAt,
    "dd 'de' LLLL 'de' u 'ás' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const [comments, setComments] = useState(["Post muito bacana, hein?!"]);

  const [newCommentText, setNewCommentText] = useState("");

  function handleNewCommentChange() {
    setNewCommentText(event.target.value);
    event.target.setCustomValidity("");
  }

  function handleCreateNewComment() {
    event.preventDefault();
    setComments([...comments, newCommentText]);

    setNewCommentText("");
  }

  function handleNewCommentInvalid() {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function deleteComment(commentToDelete) {
    const newListWithoutDeleted = comments.filter((comment) => {
      return comment !== commentToDelete;
    });

    setComments(newListWithoutDeleted);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          required
          value={newCommentText}
          onInvalid={handleNewCommentInvalid}
          onChange={handleNewCommentChange}
          name="comment"
          placeholder="Deixe um comentário"
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={data.id}
              content={comment}
              onDeleteComment={deleteComment}
              users={data}
            />
          );
        })}
      </div>
    </article>
  );
}
