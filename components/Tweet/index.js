import Link from "next/link";
import { useRouter } from "next/router";
import Avatar from "../Avatar";
import useTimeago from "../../hooks/useTimeago";
import useDateTimeFormat from "../../hooks/useDateTimeFormat";
import SpeechBuble from "../Icons/SpeechBuble";
import Retweet from "../Icons/Retweet";
import Heart from "../Icons/Heart";
import Share from "../Icons/Share";

export default function Tweet({
  avatar,
  userName,
  content,
  createdAt,
  img,
  video,
  id,
}) {
  const timeago = useTimeago(createdAt);
  const createdAtFormated = useDateTimeFormat(createdAt);
  const router = useRouter();

  const handleArticleClick = (e) => {
    e.preventDefault();
    router.push(`/status/${id}`);
  };

  const stopClickPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <article onClick={handleArticleClick}>
        <div>
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
          {img && <img alt="Uploaded file" src={img} />}
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
            <SpeechBuble width={20} height={20} stroke="#555" />
            <Retweet width={20} height={20} stroke="#555" />
            <Heart width={20} height={20} stroke="#555" />
            <Share width={20} height={20} stroke="#555" />
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

        div {
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
      `}</style>
    </>
  );
}
