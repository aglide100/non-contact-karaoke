import Layout from "../components/Layout";
import "tailwindcss/tailwind.css";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/common.css";
import { useRouter } from "next/router";

function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <AnimatePresence exitBeforeEnter initial={false}>
        <motion.div
          className="overflow-x-hidden h-screen"
          key={router.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Layout title="Hello"></Layout>
          <Component {...pageProps}></Component>
          <div>
            <footer className="w-screen bottom-0">
              <hr />
            </footer>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
