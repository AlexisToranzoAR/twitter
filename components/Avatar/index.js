export default function Avatar({ alt, src, text, withText }) {
  return (
    <>
      <div>
        <img title={alt} alt={alt} src={src} />
        {withText && <strong>{text || alt}</strong>}
      </div>

      <style jsx>{`
        img {
          border-radius: 9999px;
          height: 49px;
          width: 49px;
        }

        img + strong {
          margin-left: 8px;
        }

        div {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
}
