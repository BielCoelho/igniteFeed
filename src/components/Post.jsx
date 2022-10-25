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
    pic: "http://github.com/bielcoelho.png",
    country: "Brasil"
  }])

  useEffect(() => {

    const fetchData = async () => {
      const request = await api.get('?results=20&nat=us,br,fr,gb')

      const dados = request.data.results.map(item => {
        return {
          id: item.location.postcode,
          pic: item.picture.medium,
          country: (item.location.country == 'Brazil' ? 'Brasil' : item.location.country),
          name: `${item.name.first} ${item.name.last}`
        }
      })

      setData(dados)
    }

    fetchData()
  }, []);

  
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

  const randomComment = [
    " Post muito bacana, hein?! ",
    " Foco no objetivo, força para lutar e fé para vencer. ",
    " Positividade, cabeça erguida e um sorriso no rosto. ",
    " Tenha em mente que ao fazer o bem, receberá o bem. ",
    " Se jogue no que te faz sorrir. ",
    " Tua vida é uma cópia impressa dos teus pensamentos. ",
    " Pensamento positivo só leva a gente para frente. ",
    " Seja otimista. Esta é a melhor forma de ver a vida. ",
    " Bons pensamentos atraem acontecimentos magníficos. ",
    " Se te faltar coragem, que te sobre loucura. ",
    " Os sonhos antecedem as conquistas. ",
    " Quem não tenta, não erra. Mas também não evolui. ",
    " É proibida a entrada de más energias. ",
    " A sua mente é o limite. ",
    " O segredo é acreditar que tudo dará certo, porque vai! ",
    " Se a oportunidade não bate, construa uma porta. ",
    " Cada dia uma nova chance. ",
    " Pensamento positivo é preciso! ",
    " Comece acreditando que é possível. ",
    " Acredite, há sempre um lado positivo em tudo que existe. "
  ]

  
  const randomIndex = Math.floor(Math.random() * randomComment.length)
  const [comments, setComments] = useState([randomComment[randomIndex]]);
  const [newCommentText, setNewCommentText] = useState("");
  
  function handleNewCommentChange() {
    setNewCommentText(event.target.value);
    event.target.setCustomValidity("");
  }

  function handleCreateNewComment() {
    event.preventDefault();
    setComments([newCommentText, ...comments]); //change the person when new comment is created

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
              key={comment}
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
