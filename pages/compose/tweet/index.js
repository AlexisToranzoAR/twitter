import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Button from "../../../components/Button";
import useUser from "../../../hooks/useUser";

import { addTweet, uploadImage } from "../../../firebase/client";
import Avatar from "../../../components/Avatar";
import ArrowLeft from "../../../components/Icons/ArrowLeft";
import Navbar from "../../../components/Navbar";
import Cross from "../../../components/Icons/Cross";

const COMPOSE_STATUS = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

export default function ComposeTweet() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATUS.USER_NOT_KNOWN);

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [videoURL, setVideoURL] = useState(null);

  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (task) {
      const onProgress = () => {
        setDrag(DRAG_IMAGE_STATES.UPLOADING);
      };
      const onError = () => {
        setDrag(DRAG_IMAGE_STATES.ERROR);
      };
      const onComplete = () => {
        setDrag(DRAG_IMAGE_STATES.COMPLETE);
        if (task.snapshot.task.snapshot.metadata.contentType === "video/mp4") {
          task.snapshot.ref.getDownloadURL().then(setVideoURL);
        } else {
          task.snapshot.ref.getDownloadURL().then(setImageURL);
        }
      };
      task.on("state_changed", onProgress, onError, onComplete);
    }
  }, [task]);

  const handleChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(COMPOSE_STATUS.LOADING);
    addTweet({
      avatar: user.avatar,
      content: message,
      id: user.uid,
      image: imageURL,
      video: videoURL,
      userName: user.username,
    })
      .then(() => {
        router.push("/home");
      })
      .catch(() => {
        setStatus(COMPOSE_STATUS.ERROR);
      });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
    const file = e.dataTransfer.files[0];
    setTask(uploadImage(file));
  };

  const isButtonDisabled = !message.length || status === COMPOSE_STATUS.LOADING;

  return (
    <>
      <Head>
        <title>Publicar un nuevo Tweet / Twitter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <header>
        <div onClick={router.back} role="button" tabIndex={0}>
          <ArrowLeft width={19} height={19} stroke="#0F1419" />
        </div>
        <Button form="TweetForm" type="submit" disabled={isButtonDisabled}>
          Twittear
        </Button>
      </header>
      <section className="form-container">
        {user && (
          <section className="avatar-container">
            <Avatar src={user.avatar} />
          </section>
        )}
        <form id="TweetForm" onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            placeholder="¿Qué está pasando?"
            value={message}
          />
          {imageURL && (
            <section className="remove-media-content">
              <button onClick={() => setImageURL(null)}>
                <Cross />
              </button>
              <img alt="Tweet" src={imageURL} />
            </section>
          )}
          {videoURL && (
            <section className="remove-media-content">
              <button onClick={() => setVideoURL(null)}>
                <Cross />
              </button>
              <video
                src={videoURL}
                preload="auto"
                autoPlay="autoplay"
                controls
                loop
              >
                Sorry, your browser doesn&apos;t support embedded videos.
              </video>
            </section>
          )}
        </form>
      </section>
      <Navbar />

      <style jsx>{`
        header {
          align-items: center;
          backdrop-filter: blur(5px);
          background: #ffffffaa;
          border-bottom: 1px solid #eee;
          display: flex;
          height: 49px;
          justify-content: space-between;
          padding: 0 15px;
          position: sticky;
          top: 0;
          width: 100%;
        }

        video {
          border-radius: 16px;
          height: auto;
          width: 100%;
        }

        button {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 999px;
          border: 0;
          color: #fff;
          cursor: pointer;
          display: flex;
          font-size: 24px;
          height: 32px;
          position: absolute;
          right: 14px;
          top: 15px;
          width: 32px;
          z-index: 1;
          align-items: center;
        }

        .remove-media-content {
          position: relative;
        }

        .form-container {
          align-items: flex-start;
          display: flex;
          flex: 1;
        }

        .avatar-container {
          padding-top: 20px;
          padding-left: 20px;
        }

        div {
          align-items: center;
          display: flex;
          cursor: pointer;
        }

        form {
          padding: 10px;
          width: 100%;
        }

        img {
          border-radius: 16px;
          height: auto;
          width: 100%;
        }

        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? "3px dashed #09f"
            : "3px solid transparent"};
          border-radius: 10px;
          font-size: 21px;
          min-height: 200px;
          outline: 0;
          padding: 15px;
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  );
}
