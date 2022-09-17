import { add } from "./util";

onmessage = (e) => {
  console.log("Message received from main script");
  const workerResult = `Result: ${e.data[0] * e.data[1]}`;
  console.log("Posting message back to mainMAIN script");
  postMessage({ workerResult, a: add(4, 3) });
};
