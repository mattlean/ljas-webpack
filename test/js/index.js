import React from "react";
import { render } from "react-dom";

console.log("Hello, world!");
console.log("FOO_FREE_VAR:", FOO_FREE_VAR);

const root = document.createElement("div");
root.setAttribute("id", "root");
document.body.append(root);
render(<h1>Hello world!</h1>, root);
