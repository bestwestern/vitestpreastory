import { useEffect } from "preact/hooks";
import { signal } from "@preact/signals";
import preactLogo from "./assets/preact.svg";
import "./app.css";
import { programmelist } from "./programmelist";
import Accordion from "./accordion";
import Link from "./link";
import Home from "./home";

export function App() {
  const count = signal(0);
  const todos = signal([{ text: "Buy groceries" }, { text: "Walk the dog" }]);
  const route = signal(location.pathname.substring(1).split("/"));

  const text = signal("");

  function addTodo() {
    todos.value = [...todos.value, { text: text.value }];
    text.value = ""; // Reset input value on add
  }
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
      route.value = event.target?.location?.pathname.substr(1).split("/");
    });

    window.ww = ww;
    console.log("Message posted to worker");
  }, []);
  const click = () => {
    route.value = ["23"];
  };
  const onInput = (event) => (text.value = event.target.value);
  // console.log(import.meta.env.VITE_SOME_KEY);
  const removeTodo = (todo) => {
    todos.value = todos.value.filter((t) => t !== todo);
  };
  console.table(route.value);
  return (
    <div class="min-h-full min-w-full">
      <br></br>
      <Link route={route} newRoute={["test"]}></Link>
      <br></br>
      <Link route={route} newRoute={[""]}></Link>
      <br></br>
      <input value={text.value} onInput={onInput} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.value.map((todo) => (
          <li>
            {todo.text} <button onClick={() => removeTodo(todo)}>❌</button>
          </li>
        ))}
      </ul>
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
      <button onClick={() => count.value++}>Value: {count.value}</button>
      <button onClick={click}>count issfsfdsd {count}</button>

      {route.value[0] === "" && <Home programmelist={programmelist}></Home>}
      <h1 className="text-3xl font-bold ">Hello world!</h1>
      <div>
        <Accordion title="titles">
          <h4>Contentfds</h4>
        </Accordion>
        <button onClick={click}>worker</button>
      </div>
    </div>
  );
}
