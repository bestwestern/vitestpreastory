import { useState, useEffect } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import "./app.css";
import { programmelist } from "./programmelist";
import Accordion from "./accordion";
import Home from "./home";

export function App() {
  const [route, setRoute] = useState(location.pathname.substring(1).split("/"));
  useEffect(() => {
    var ww = new Worker(new URL("./worker.js", import.meta.url), {
      type: "module",
    });
    ww.onmessage = (ev) => {
      console.log(ev.data);
    };
    ww.postMessage({
      routeChange: location.pathname.substring(1).split("/"),
    });
    window.addEventListener(
      "popstate",
      (event: Event) =>
        ww.postMessage({
          //@ts-ignore
          routeChange: event.target?.location?.pathname.substr(1).split("/"),
        }),
      false
    );

    window.ww = ww;
    console.log("Message posted to worker");
  }, []);
  const [count, setCount] = useState(0);
  const click = () => {};
  console.log(import.meta.env.VITE_SOME_KEY);
  return (
    <div class="min-h-full min-w-full">
      <pre>{JSON.stringify({ route }, null, 2)}</pre>
      {route[0] === "" && <Home programmelist={programmelist}></Home>}

      <h1 className="text-3xl font-bold ">Hello world!</h1>
      <div>
        <Accordion title="titles">
          <h4>Contentfds</h4>
        </Accordion>
        <button onClick={click}>worker</button>
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
    </div>
  );
}
