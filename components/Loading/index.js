export default function Loading() {
  return (
    <>
      <div className="twitter-spin">
        <svg height="100%" viewBox="0 0 32 32" width="100%">
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            strokeWidth="4"
            style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}
          />
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            strokeWidth="4"
            style={{
              stroke: "rgb(29, 155, 240)",
              strokeDasharray: 80,
              strokeDashoffset: 60,
            }}
          />
        </svg>
      </div>

      <style jsx>{`
        .twitter-spin {
          height: 26px;
          margin: auto;
          width: 26px;
        }

        .twitter-spin svg {
          animation: spin 0.75s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(359deg);
          }
        }
      `}</style>
    </>
  );
}
