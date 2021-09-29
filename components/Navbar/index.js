import Link from "next/link";
import Create from "../Icons/Create";
import Home from "../Icons/Home";
import Search from "../Icons/Search";
import { colors } from "../../styles/theme";

export default function Navbar() {
  return (
    <>
      <nav>
        <Link href="/home">
          <a>
            <Home width={32} height={32} stroke="#89f" />
          </a>
        </Link>
        <Link href="/search">
          <a>
            <Search width={32} height={32} stroke="#89f" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Create width={32} height={32} stroke="#89f" />
          </a>
        </Link>
      </nav>
      
      <style jsx>{`
        nav {
          background: #fff;
          border-top: 1px solid #eee;
          bottom: 0;
          display: flex;
          min-height: 49px;
          position: sticky;
          width: 100%;
        }

        nav a {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
        }

        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }

        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  );
}
