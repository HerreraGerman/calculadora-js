import handler from "./handler.ts";
import promptSync from "prompt-sync";

const prompt = promptSync();

let doLoop = true;
function mainLoop(): void {
    do{
        handler();
        console.log("Desea realizar otra operacion? (S/N)")
        const respuesta = prompt("(S/N): ");
        if(respuesta?.toLowerCase() !== 's'){
            doLoop = false;
        }
        console.clear();
    } while(doLoop);
    console.log("See you next time!");
}

export default mainLoop;