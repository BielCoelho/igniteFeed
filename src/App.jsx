import styles from './app.module.css';
import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from './components/Sidebar';
import './global.css';

export function App() {

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
        <Post 
        author="Gabriel Coelho"
        content="Eu sou o Gabriel Coelho"
      />
      <Post
        author="Kevin Pagliuca"
        content="Eu estou ensinando o Gabriel" 
      />
        </main>
      </div>

    </div>
  )
}
