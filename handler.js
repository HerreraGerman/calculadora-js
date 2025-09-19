import { suma, resta, mult, div } from "./operacion.js";
import defineOperacion from "./input.js";

function handler() {
    let { operandos, operacion } = defineOperacion();
    let resultado;
    switch (operacion) {
        case 1:
            resultado = suma(...operandos);
            break;
        case 2:
            resultado = resta(...operandos);
            break;
        case 3:
            resultado = mult(...operandos);
            break;
        case 4:
            resultado = div(...operandos);
            break;
        default:
            console.log(`Operacion no valida!`);
            resultado = NaN;
            break;
    }
    console.log(`El resultado de la operacion es ${resultado}`);
}

export default handler;