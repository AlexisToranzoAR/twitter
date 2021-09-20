import styles, { globalStyles } from "./styles";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
      <style jsx>{styles}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  );
}

export default MyApp;
