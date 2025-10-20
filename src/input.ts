import figlet from "figlet";
import promptSync from 'prompt-sync';
import type { InputData, OperacionTipo } from './types.ts';

const prompt = promptSync();


// Funcion de input tipada
function input(valor: string): number {
    console.log(valor);
    const valorLeido = prompt(`> `);
    const numero = parseInt(valorLeido);
    return isNaN(numero) ? NaN : numero;
}

// Funcion principal de entrada
function defineOperacion(): InputData {
    let cantidad: number;
    do {
        cantidad = input(`Ingrese la cantidad de operandos (Minimo 2): `);
    } while (isNaN(cantidad) || cantidad < 2);
    const operandos: number[] = [];
    for (let i = 1; i <= cantidad; i++) {
        let operando: number;
        do {
            operando = input(`Ingrese ${i}° operando: `);
        } while (isNaN(operando));
        operandos.push(operando);
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
        function (err: Error | null, data?: string) {
            if (err) {
                console.log("Algo fallo!");
                console.dir(err);
                return;
            }
            if (data) console.log(data);
        }
    );

    console.log("<------------------------Menu-------------------------->");
    console.log(`1) Suma`);
    console.log(`2) Resta`);
    console.log(`3) Multiplicacion`);
    console.log(`4) Division`);
    let operacion: number;
    do {
        operacion = input('Elija una operacion a realizar (1 - 4): ');
    } while (isNaN(operacion) || operacion < 1 || operacion > 4);
    return { operandos, operacion: operacion as OperacionTipo};
}

export default defineOperacion;