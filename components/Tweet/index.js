import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Avatar from "../Avatar";
import useTimeago from "../../hooks/useTimeago";
import useDateTimeFormat from "../../hooks/useDateTimeFormat";
import SpeechBuble from "../Icons/SpeechBuble";
import Retweet from "../Icons/Retweet";
import Heart from "../Icons/Heart";
import Share from "../Icons/Share";
import { getUserToken } from "../../firebase/client";

export default function Tweet({
  avatar,
  userName,
  userId,
  content,
  createdAt,
  image,
  likes,
  video,
  id,
}) {
  const timeago = useTimeago(createdAt);
  const createdAtFormated = useDateTimeFormat(createdAt);
  const router = useRouter();
  const [showCopiedToClipboard, setShowCopiedToClipboard] = useState(false);

  const handleArticleClick = (e) => {
    e.preventDefault();
    router.push(`/status/${id}`);
  };

  const stopClickPropagation = (e) => {
    e.stopPropagation();
  };

  const handleClickLike = async (e, tweetId) => {
    e.stopPropagation();
    const userToken = await getUserToken();
    fetch(`/api/tweet/like/${tweetId}`, {
      method: "POST",
      body: JSON.stringify({ userToken }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error));
  };

  const handleClickShare = async (e, tweetId) => {
    e.stopPropagation();
    const baseURL = window.location.origin;
    navigator.clipboard.writeText(`${baseURL}/status/${tweetId}`);
    setShowCopiedToClipboard(true);
    setTimeout(() => setShowCopiedToClipboard(false), 5000);
  };

  return (
    <>
      {showCopiedToClipboard && (
        <div className="copied-to-clipboard">Copiado al portapapeles</div>
      )}

      <article onClick={handleArticleClick}>
        <div className="avatar-icon">
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <Link href={`/status/${id}`}>
              <a>
                <time title={createdAtFormated}>{timeago}</time>
              </a>
            </Link>
          </header>
          <p>{content}</p>
          {image && <img alt="Uploaded file" src={image} />}
          {video && (
            <video
              onClick={stopClickPropagation}
              src={video}
              preload="auto"
              controls
              loop
            >
              Sorry, your browser doesn&apos;t support embedded videos.
            </video>
          )}
          <footer>
            <div>
              <SpeechBuble width={20} height={20} stroke="#536471" />
            </div>
            <div>
              <Retweet width={20} height={20} stroke="#536471" />
            </div>
            <div className="icon-container">
              {likes.find((like) => like.id === userId) ? (
                <>
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={(e) => handleClickLike(e, id)}
                    className="icon-svg icon-svg-like"
                  >
                    <Heart width={20} height={20} stroke="#f91880" />
                  </div>
                  <div className="icon-quantity" style={{ color: "#f91880" }}>
                    {likes.length > 0 && likes.length}
                  </div>
                </>
              ) : (
                <>
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={(e) => handleClickLike(e, id)}
                    className="icon-svg icon-svg-like"
                  >
                    <Heart width={20} height={20} stroke="#536471" />
                  </div>
                  <div className="icon-quantity" style={{ color: "#536471" }}>
                    {likes.length > 0 && likes.length}
                  </div>
                </>
              )}
            </div>
            <div
              tabIndex={0}
              role="button"
              onClick={(e) => handleClickShare(e, id)}
              className="icon-svg icon-svg-share"
            >
              <Share width={20} height={20} stroke="#536471" />
            </div>
          </footer>
        </section>
      </article>

      <style jsx>{`
        footer {
          margin-top: 5px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        section {
          width: 100%;
        }

        article {
          border-bottom: 2px solid #eee;
          cursor: pointer;
          display: flex;
          padding: 10px 15px;
        }

        article:hover {
          background: #f5f8fa;
        }

        .avatar-icon {
          padding-right: 10px;
        }

        img {
          border-radius: 16px;
          height: auto;
          margin-top: 10px;
          width: 100%;
        }

        video {
          border-radius: 16px;
          cursor: default;
          height: auto;
          margin-top: 10px;
          width: 100%;
        }

        p {
          line-height: 1.3125;
          margin: 0;
        }

        time {
          color: #555;
          font-size: 14px;
        }

        a {
          text-decoration: none;
        }

        .icon-container {
          display: flex;
          align-items: center;
        }

        .icon-svg {
          padding: 7px;
          display: flex;
        }

        .icon-svg-like:hover {
          background: radial-gradient(#f918801a 15%, transparent 16%);
          background-size: 150px 150px;
          background-position: center;
          stroke: #f91880;
        }

        .icon-svg-like:hover > :global(svg) {
          stroke: #f91880;
        }

        .icon-svg-share:hover {
          background: radial-gradient(#1d9bf01a 15%, transparent 16%);
          background-size: 150px 150px;
          background-position: center;
          stroke: #1d9bf0;
        }

        .icon-svg-share:hover > :global(svg) {
          stroke: #1d9bf0;
        }

        .icon-quantity {
          font-size: 12px;
        }

        .copied-to-clipboard {
          align-items: center;
          background: #1d9bf0;
          border-radius: 4px;
          bottom: 10%;
          color: #ffffff;
          display: flex;
          height: 41px;
          justify-content: center;
          left: 50%;
          position: fixed;
          transform: translate(-50%, -50%);
          width: 196px;
          z-index: 1;
        }
      `}</style>
    </>
  );
}
