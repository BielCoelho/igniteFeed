import { useEffect, useState } from "react";
import styles from "./app.module.css";
import { Header } from "./components/Header";
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
        avatarUrl: 'https://github.com/bielcoelho.png',
        name: 'Gabriel Coelho',
        role: 'Student @Rocketseat'
      },
      content: [
        {type: 'paragraph', content:'Fala galeraa 👋'},
        {type: 'paragraph', content:' Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
        {type: 'link', content:'jane.design/doctorcare'},
      ],
      publishedAt: new Date('2022-10-23 20:00:00'),
    },
    {
      id: 2,
      author: {
        avatarUrl: 'https://github.com/KevinPagliuca.png',
        name: 'Kevin Pagliuca',
        role: 'The guy teaching Gabriel'
      },
      content: [
        {type: 'paragraph', content:'Fala galeraa 👋'},
        {type: 'paragraph', content:' Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
        {type: 'link', content:'jane.design/doctorcare'},
      ],
      publishedAt: new Date('2022-10-20 20:00:00'),
    },
  ]

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    setTimeout(() => {
      setFinished(true);
    }, 2500);
  }, []);

  return (
    <div className={loading ? styles.loading : null}>
      {/* <Header /> */}
      <Splash loading={loading} />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (<Post 
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
             />)
          })}
        </main>
      </div>
    </div>
  );
}
