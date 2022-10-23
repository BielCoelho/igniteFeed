import styles from "./Post.module.css";

export function Post() {
  return (
    <article>
      <header>
        <div className={styles.author}>
          <img
            className={styles.avatar}
            src="https://github.com/bielcoelho.png"
          />
          <div className={styles.authorInfo}>
            <strong>Gabriel Coelho</strong>
            <span>Web Developer</span>
          </div>
          <time
            title="Publicado 23 de outubro de 2022 ás 10:12"
            dateTime="23-10-2022 10:12:30"
          >
            Publicado há 1h
          </time>
        </div>
      </header>

      <div className={styles.postContent}>
        <p>Fala galeraa 👋</p>

        <p>
          Acabei de subir mais um projeto no meu portifa. É um projeto que fiz
          no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀
        </p>

        <p>👉 <a href=''>jane.design/doctorcare</a></p>

        <p><a href=''>#novoprojeto #nlw #rocketseat</a></p>
      </div>
    </article>
  );
}
