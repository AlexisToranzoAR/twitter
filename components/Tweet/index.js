import Link from "next/link";
import { useRouter } from "next/router";
import Avatar from "../Avatar";
import useTimeago from "../../hooks/useTimeago";
import useDateTimeFormat from "../../hooks/useDateTimeFormat";

export default function Tweet({
  avatar,
  userName,
  content,
  createdAt,
  img,
  id,
}) {
  const timeago = useTimeago(createdAt);
  const createdAtFormated = useDateTimeFormat(createdAt);
  const router = useRouter();

  const handleArticleClick = (e) => {
    e.preventDefault();
    router.push(`/status/${id}`);
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
        </section>
      </article>

      <style jsx>{`
        article {
          border-bottom: 2px solid #eee;
          padding: 10px 15px;
          display: flex;
        }

        article:hover {
          background: #f5f8fa;
          cursor: pointer;
        }

        div {
          padding-right: 10px;
        }

        img {
          border-radius: 10px;
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
      `}</style>
    </>
  );
}
