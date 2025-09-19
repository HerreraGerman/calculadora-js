function suma(a, b, ...numeros) {
    let total = a + b;
    for (let i = 0; i< numeros.length; i++) {
        total += numeros[i];
    }
    return total;
}

function resta(a, b, ...numeros) {
    let total = a - b;
    for (let i = 0; i< numeros.length; i++) {
        total -= numeros[i];
    }
    return total;
}

function mult(a, b, ...numeros) {
    let total = a * b;
    for (let i = 0; i< numeros.length; i++) {
        total *= numeros[i];
    }
    return total;
}

function div(a, b, ...numeros) {
    let total = a / b;
    for (let i = 0; i< numeros.length; i++) {
        total /= numeros[i];
    }
    return total;
}

export {suma, resta, mult, div};