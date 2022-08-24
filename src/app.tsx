import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import "./app.css";
import Accordion from "./accordion";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Accordion title="titles">
          <h4>Contentfds</h4>
        </Accordion>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/imgs/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img src={preactLogo} class="logo preact" alt="Preact logo" />
        </a>
      </div>
      <h1>9</h1>
      <h1>Vite + Preact v6</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count issfsfdsd {count}
        </button>
        <p>
          Edit <code>src/app.tsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        Click on the Vite and Preact logos to learn more
      </p>
    </>
  );
}
