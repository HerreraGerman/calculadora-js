**TypeScript - Programación Orientada a Objetos (OOP) basada en Prototipos - Parte Teorica** (Ejercicio 1)


**1. Generalización simbólica:**
   - Casi todo es un objeto: La regla principal. Los únicos elementos que no son objetos son los tipos primitivos (string, number, boolean, null, undefined, symbol, bigint). Sin embargo, incluso los primitivos se comportan temporalmente como objetos cuando se accede a sus propiedades (ej. 'hola'.length).
   - Herencia a través de la "Cadena de Prototipos": Esta es la ley central del paradigma. Cada objeto tiene un enlace interno oculto (denominado [[Prototype]]) que apunta a otro objeto, su prototipo. Resolución de propiedades: Cuando se accede a una propiedad (ej. miObjeto.miMetodo), el motor de JS sigue esta regla:
     1. ¿Existe la propiedad en miObjeto? Si sí, se usa.
     2. Si no, ¿existe en el [[Prototype]] de miObjeto? Si sí, se usa.
     3. Si no, ¿existe en el [[Prototype]] del prototipo? Y así sucesivamente...
     4. Esto continúa hasta alcanzar Object.prototype, y finalmente null (el final de la cadena).
   - La propiedad prototype (en funciones): Las funciones (que también son objetos) tienen una propiedad especial llamada prototype. Este objeto no es el prototipo de la función en sí, sino el objeto que se asignará como [[Prototype]] a todas las nuevas instancias creadas usando esa función como constructor (con la palabra clave new).
   - La palabra clave new: Este operador automatiza la creación de instancias. Al ejecutar new MiConstructor(), JS:
     1. Crea un nuevo objeto vacío ({}).
     2. Asigna el [[Prototype]] de este nuevo objeto para que apunte a MiConstructor.prototype.
     3. Ejecuta MiConstructor con el this apuntando al nuevo objeto.
     4. Retorna el nuevo objeto.
   - El enlace this dinámico: Una regla crucial. El valor de this dentro de una función no se determina por dónde se definió (como en la herencia léxica), sino por cómo se invoca (el "sitio de llamada" o call-site). Esto es fundamental para que los métodos en un prototipo (ej. Array.prototype.map) operen sobre la instancia correcta (ej. miArray).


**2. Creencias de los profesionales:**
   1. Creencia en la Simplicidad: "Objetos que heredan de objetos" es superior. La creencia fundamental es que el modelo de clases (como en Java o C#) introduce una abstracción innecesaria: la "Clase". En el modelo de prototipos, la ontología es más simple: solo existen objetos. Un objeto simplemente delega el comportamiento que no tiene a otro objeto (su prototipo). Se considera una forma más directa y limpia de herencia.
   2. Creencia en el Dinamismo y la Flexibilidad. Se cree que el modelo de prototipos es intrínsecamente más flexible. Dado que los prototipos son solo objetos, pueden ser modificados en tiempo de ejecución. Esto permite hazañas como:
      - Extensión en caliente (Hot-swapping): Puedes agregar un método a MiConstructor.prototype y todas las instancias existentes (incluso las ya creadas) ganarán acceso instantáneo a ese nuevo método. Esto es casi imposible en lenguajes clásicos estáticos.
      - Mutación de la herencia: Puedes cambiar el prototipo de un objeto en cualquier momento (usando Object.setPrototypeOf()), cambiando efectivamente su "clase" sobre la marcha.
   5. Creencia en el Minimalismo: Las clases son solo "azúcar sintáctico". Esta creencia se fortaleció cuando JS introdujo la sintaxis class (en ES6). Los puristas de los prototipos argumentan (correctamente) que la palabra clave class en JS no introduce un nuevo modelo de herencia; es solo una sintaxis alternativa ("azúcar") que opera exactamente sobre el mismo mecanismo de prototipos subyacente. La creencia es que usar prototipos directamente es más "honesto" y expone el verdadero funcionamiento del lenguaje.
   6. Creencia en la Composición sobre la Herencia. Aunque los prototipos implementan la herencia, el modelo (al ser tan flexible y basado en objetos) facilita mucho más los patrones de composición (como mixins o concatenación de objetos) que los modelos de clases rígidos. Se cree que la herencia de prototipos es menos frágil (menos propensa al "problema de la clase base frágil") porque la delegación es más explícita.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**Carateristicas de OOP utilizadas** (Ejercicio 4)
1. Encapsulamiento
- ¿Que es? El encapsulamiento es la idea de agrupar datos (propiedades) y las funciones que operan sobre esos datos (métodos) en una sola unidad: un objeto.
- Fundamentación: Antes, los datos (operandos) y la lógica (suma, resta, etc.) estaban en archivos separados. El handler.js tenía que importar todo y actuar como un "coordinador" manual. Ahora, la Calculadora es una unidad autónoma.
- Ejemplo: La función constructora Calculadora crea un objeto que "encapsula" su propio estado:
  function Calculadora(this: ICalculadora) {
    this.operandos = []; // Estado (dato)
    this.resultado = null; // Estado (dato)
  }
  Y también encapsula su comportamiento (métodos):
  Calculadora.prototype.calcular = function(this: ICalculadora, operacion: number): void {
    // ...lógica de switch...
  };
  La instancia miCalculadora en handler.ts ahora "posee" tanto sus datos como la lógica para trabajar con ellos.

2. Abstracción
- ¿Que es? La abstracción consiste en ocultar los detalles complejos de implementación y exponer solo las funciones esenciales. Es el "qué" (la API pública) vs. el "cómo" (la lógica interna).
- Fundamentación: Este es el beneficio más grande que obtuviste. Tu archivo handler.ts (el "consumidor" del objeto) ahora es increíblemente simple. No le importa cómo se suma o se divide; solo le pide a la calculadora que lo haga.
- Ejemplo: La Abstracción (Lo que SÍ se ve): El handler.ts solo conoce e interactúa con la interfaz ICalculadora:
    // handler.ts
    miCalculadora.setOperandos(operandos);
    miCalculadora.calcular(operacion);
  La Implementación Oculta (Lo que NO se ve): El handler.ts no tiene idea de que existen estos métodos "privados" (por convención, con guion bajo _). Estos son los detalles de implementación que se han ocultado.
    // calculadora.ts
    Calculadora.prototype._suma = function(this: ICalculadora): number { /* ... */ };
    Calculadora.prototype._resta = function(this: ICalculadora): number { /* ... */ };
    Calculadora.prototype._mult = function(this: ICalculadora): number { /* ... */ };
    Calculadora.prototype._div = function(this: ICalculadora): number { /* ... */ };
  Si mañana se decidiera cambiar la lógica de _suma para usar un método más eficiente, handler.ts no necesita ningún cambio, porque la abstracción (calcular) no cambió.

**Caracteristicas de OOP NO utilizadas**
1. Herencia (Extensión)
- ¿Que es? La herencia es la capacidad de crear una nueva "clase" (o prototipo) que reutiliza, extiende o modifica el comportamiento de otra existente.
- Por qué no se usó: Simplemente no era necesario para este programa. La herencia se utiliza cuando se tiene distintos tipos de un mismo concepto.
- Ejemplo donde SÍ se usaría: Si se quisiera crear una CalculadoraCientifica que "es una" Calculadora pero que además tiene nuevos métodos como seno() o coseno().
- Conclusión: Para una sola calculadora, crear una jerarquía de herencia solo habría agregado complejidad innecesaria.

2. Polimorfismo
- ¿Que es? El polimorfismo (literalmente "muchas formas") es la capacidad de que diferentes objetos respondan al mismo "mensaje" (llamada de método) de formas distintas.
- Por qué no se usó: El polimorfismo depende casi siempre de la Herencia. Para tener polimorfismo, se necestaria tener múltiples tipos de objetos que compartan una misma interfaz.
- Ejemplo donde SÍ se usaría: Siguiendo el ejemplo anterior, si tuviéramos Calculadora y CalculadoraCientifica, y ambas tuvieran un método mostrarMenu().
  - Calculadora.prototype.mostrarMenu(): Imprimiría "1. Suma, 2. Resta...".
  - CalculadoraCientifica.prototype.mostrarMenu(): Imprimiría "1. Suma, 2. Resta... 5. Seno, 6. Coseno".
  - se podria tener un array [new Calculadora(), new CalculadoraCientifica()] y llamar calc.mostrarMenu() a cada uno, y cada objeto respondería de su propia manera (polimórfica) al mismo mensaje.
- Conclusión: Como solo hay un tipo de objeto (Calculadora), no hay "muchas formas" que demostrar.
