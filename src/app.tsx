import { useEffect } from "preact/hooks";
import { signal } from "@preact/signals";
import "./app.css";
import { programmelist } from "./programmelist";
import Link from "./link";
import Home from "./home";
const imports = ["accordion2", "accordion"];
const route = signal(location.pathname.substring(1).split("/"));
let dynamicModules = signal({});
const mods = signal({});
export function App() {
  //const [route, setRoute] = useState(location.pathname.substring(1).split("/"));
  useEffect(() => {
    var ww = new Worker(new URL("./worker.js", import.meta.url), {
      type: "module",
    });
    ww.onmessage = (ev) => {
      console.log(ev.data);
    };
    window.addEventListener("popstate", (event: Event) => {
      //@ts-ignore
      console.log("oppp");
      const routeArray = event.target.location.pathname.substr(1).split("/");
      console.log({ routeArray });
      route.value = routeArray;
    });
    // setTimeout(() => {
    import("./accordion2").then((val) => {
      dynamicModules.value = {
        ...dynamicModules.value,
        accordion2: val.default,
      };
    });
    import("./accordion").then((val) => {
      dynamicModules.value = {
        ...dynamicModules.value,
        accordion: val.default,
      };
    });
    // }, 1500);
    window.ww = ww;
    console.log("Message posted to worker");
  }, []);
  // console.log(import.meta.env.VITE_SOME_KEY);
  console.table(route.value);
  return (
    <div class="min-h-full min-w-full">
      <br></br>
      <Link route={route} newRoute={["acc2"]}></Link>
      <br></br>
      <Link route={route} newRoute={[""]}></Link>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <ul>
        {route.value.map((linkpart) => (
          <li>{linkpart}</li>
        ))}
      </ul>
      <br></br>
      {route.value[0] === "acc2" &&
        dynamicModules.value.accordion2 != undefined && (
          <dynamicModules.value.accordion2 title="titles2">
            <h4>222</h4>
          </dynamicModules.value.accordion2>
        )}
      {dynamicModules.value.accordion != undefined && (
        <dynamicModules.value.accordion title="titles1">
          <h4>acordian1</h4>
        </dynamicModules.value.accordion>
      )}
    </div>
  );
}
