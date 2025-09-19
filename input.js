import { createRequire } from 'module';
import figlet from "figlet";
const require = createRequire(import.meta.url);

const prompt = require('prompt-sync')();

function input(valor) {
    console.log(`${valor}`);
    let valorLeido = prompt();
    return parseInt(valorLeido);
}

function defineOperacion() {
    let cantidad;
    do {
        cantidad = input(`Ingrese la cantidad de operandos (Minimo 2): `);
    } while (isNaN(cantidad) || cantidad < 2);
    let operandos = [];
    for (let i = 1; i <= cantidad; i++) {
        operandos.push(input(`Ingrese ${i}° operando: `));
    }
    console.clear();
        figlet.text(
        "Calculadora",
        {
            font: "Doom",
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 100,
            whitespaceBreak: true,
        },
        function (err, data) {
            if (err) {
                console.log("Algo fallo!");
                console.dir(err);
                return;
            }
            console.log(data);
        }
    );
    console.log("<------------------------Menu-------------------------->");
    console.log(`1) Suma`);
    console.log(`2) Resta`);
    console.log(`3) Multiplicacion`);
    console.log(`4) Division`);
    let operacion = input('Elija una operacion a realizar: ');
    return {operandos, operacion};
}

export default defineOperacion;