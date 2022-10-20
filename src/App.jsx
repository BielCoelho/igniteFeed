import { Header } from "./components/Header";
import './global.css';
import { Post } from "./Post";

export function App() {

  return (
    <div>
      <Header />
      <Post 
        author="Gabriel Coelho"
        content="Eu sou o Gabriel Coelho"
      />
      <Post
        author="Kevin Pagliuca"
        content="Eu estou ensinando o Gabriel" 
      />
      <Post />
      <Post />
      <Post />
    </div>
  )
}
