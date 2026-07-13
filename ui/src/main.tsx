import { render } from "preact";
import { WorkerInterface } from "./views/WorkerInterface.tsx";
import "./theme";
import "./index.css";

render(<WorkerInterface />, document.getElementById("app")!);
