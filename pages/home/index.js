import Head from "next/head";
import { useEffect, useState } from "react";
import Tweet from "../../components/Tweet";
import { listenLatestTweets } from "../../firebase/client";
import useUser from "../../hooks/useUser";
import Avatar from "../../components/Avatar";
import Navbar from "../../components/Navbar";

export default function HomePage() {
  const [timeline, setTimeLine] = useState([]);
  const user = useUser();

  useEffect(() => {
    let unsuscribe;
    if (user) {
      unsuscribe = listenLatestTweets(setTimeLine);
    }
    return () => unsuscribe && unsuscribe();
  }, [user]);

  return (
    <>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <header>
        <Avatar
          width="30px"
          height="30px"
          alt={user?.username}
          src={user?.avatar}
        />
        <h2>Inicio</h2>
      </header>
      <section>
        {timeline.map((tweet) => (
          <Tweet
            avatar={tweet.avatar}
            createdAt={tweet.createdAt}
            content={tweet.content}
            id={tweet.id}
            img={tweet.img}
            key={tweet.id}
            userName={tweet.userName}
            userId={tweet.userId}
          />
        ))}
      </section>
      <Navbar />

      <style jsx>{`
        header {
          align-items: center;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #eee;
          height: 49px;
          display: flex;
          padding-left: 15px;
          position: sticky;
          top: 0;
          width: 100%;
        }

        section {
          flex: 1;
        }

        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 20px;
        }
      `}</style>
    </>
  );
}
