import Layout from "../components/Layout";
import "tailwindcss/tailwind.css";
import "../styles/common.css";

function App({ Component, pageProps }) {
  return (
    <>
      <Layout title="Hello"></Layout>
      <Component {...pageProps}></Component>
      <div>
        <footer className="">
          <hr />
        </footer>
      </div>
    </>
  );
}

export default App;
