import Avatar from "../Avatar";

export default function Tweet({ avatar, userName, content, id }) {
  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <strong>{userName}</strong>
          <p>{content}</p>
        </section>
      </article>

      <style jsx>{`
        article {
          border-bottom: 2px solid #eee;
          padding: 10px 15px;
          display: flex;
        }

        div {
          padding-right: 10px;
        }

        p {
          line-height: 1.3125;
          margin: 0;
        }
      `}</style>
    </>
  );
}
