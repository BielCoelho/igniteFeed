import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./app.module.css";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";
import { Splash } from "./components/Splash";
import "./global.css";

export function App() {
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const posts = [
    {
      id: 1,
      author: {
        avatarUrl: "https://github.com/bielcoelho.png",
        name: "Gabriel Coelho",
        role: "Student @Rocketseat",
      },
      content: [
        { type: "paragraph", content: "Fala galeraa 👋" },
        {
          type: "paragraph",
          content:
            " Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat 🚀",
        },
        { type: "paragraph", content: " O projeto é o IgniteFeed " },
        { type: "link", content: "jane.design/doctorcare" },
      ],
      publishedAt: new Date("2022-10-23 20:00:00"),
    },
    {
      id: 2,
      author: {
        avatarUrl: "https://github.com/KevinPagliuca.png",
        name: "Kevin Pagliuca",
        role: "Experienced Developer",
      },
      content: [
        { type: "paragraph", content: "Salve Salve." },
        {
          type: "paragraph",
          content: " Estou de olho em você, acompanhando sua jornada 🚀",
        },
        { type: "paragraph", content: " Pode contar comigo 😎" },
      ],
      publishedAt: new Date("2022-10-20 20:00:00"),
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    setTimeout(() => {
      setFinished(true);
    }, 2500);
    setTimeout(() => {
      toast.info("A cada F5 novos comentários", {
        toastId: 1
      });
    }, 2800);
    setTimeout(() => {
      toast.info("Cada comentário gera uma pessoa aleatória", {
        toastId: 2
      });
    }, 5000);
    setTimeout(() => {
      toast("🦄 Cheat de aplausos infinito ativado", {
        toastId: 3
      });
    }, 13000);
  }, []);

  return (
    <div className={loading ? styles.loading : null}>
      <ToastContainer
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Splash loading={loading} />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}
