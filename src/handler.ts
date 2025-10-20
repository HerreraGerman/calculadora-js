import Calculadora from './calculadora.ts';
import defineOperacion from "./input.ts";
import type { InputData } from './types.ts';

const miCalculadora = new Calculadora();

function handler(): void {
    const { operandos, operacion }: InputData = defineOperacion();

    miCalculadora.setOperandos(operandos);

    miCalculadora.calcular(operacion);
}

export default handler;