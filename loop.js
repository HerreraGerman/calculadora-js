import handler from "./handler.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const prompt = require('prompt-sync')();

let doLoop = true;
function mainLoop() {
    do{
        handler();
        console.log("Desea realizar otra operacion? (S/N)")
        let respuesta = prompt();
        if(respuesta.toLowerCase() !== 's'){
            doLoop = false;
        }
        console.clear();
    } while(doLoop);
}

export default mainLoop;