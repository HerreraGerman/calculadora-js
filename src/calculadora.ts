// Interfaz Calculadora
export interface ICalculadora {
    operandos: number[];
    resultado: number | null;
    setOperandos(operandos: number[]): void;
    getResultado(): number | null;
    calcular(operacion: number): void;
    _suma(): number;
    _resta(): number;
    _mult(): number;
    _div(): number;
}

// Constructor
function Calculadora(this: ICalculadora) {
    this.operandos = [];
    this.resultado = null;
}

// Prototipos
Calculadora.prototype.setOperandos = function(this: ICalculadora, operandos: number[]): void {
    this.operandos = operandos;
}

Calculadora.prototype.getResultado = function(this: ICalculadora): number | null{
    return this.resultado;
}

// -- Metodos de Operacion --
Calculadora.prototype._suma = function(this: ICalculadora): number{
    if (this.operandos.length < 2) return 0;
    return this.operandos.reduce((acc, val) => acc + val);
};

Calculadora.prototype._resta = function(this: ICalculadora): number{
    if (this.operandos.length < 2) return 0;
    return this.operandos.reduce((acc, val) => acc - val);
};

Calculadora.prototype._mult = function(this: ICalculadora): number{
    if (this.operandos.length < 2) return 1;
    return this.operandos.reduce((acc, val) => acc * val);
};

Calculadora.prototype._div = function(this: ICalculadora): number{
    if (this.operandos.length < 2) return 0;
    if (this.operandos.slice(1).some(n => n === 0)) {
        console.error("Error: Division por cero detectada!");
        return NaN;
    }
    return this.operandos.reduce((acc, val) => acc / val);
};

// Metodo Principal
Calculadora.prototype.calcular = function(this: ICalculadora, operacion: number): void {
    switch (operacion) {
        case 1:
            this.resultado = this._suma();
            break;
        case 2:
            this.resultado = this._resta();
            break;
        case 3:
            this.resultado = this._mult();
            break;
        case 4:
            this.resultado = this._div();
            break;
        default:
            console.log("Operacion no valida!");
            this.resultado = NaN;
            break;
    }
    console.log(`El resultado de la operacion es ${this.resultado}`);
}

export default Calculadora as unknown as { new(): ICalculadora; };