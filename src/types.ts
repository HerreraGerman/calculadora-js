export type OperacionTipo = 1 | 2 | 3 | 4;

export interface InputData {
    operandos: number[];
    operacion: OperacionTipo;
}