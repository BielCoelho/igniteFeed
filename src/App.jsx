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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
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
          <Post author="Gabriel Coelho" content="Eu sou o Gabriel Coelho" />
          <Post
            author="Kevin Pagliuca"
            content="Eu estou ensinando o Gabriel"
          />
        </main>
      </div>
    </div>
  );
}
