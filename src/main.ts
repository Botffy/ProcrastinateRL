import { sayHi } from "./greet";

function show(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHi(name);
}

show("greeting", "ProcrastinateRLL");
