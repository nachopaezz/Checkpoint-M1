// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint tendrán en el archivo DS.js las implementaciones ya realizadas en las
// homeworks de Queue, LinkedLis y BinarySearchTree. Sobre dicha implementación van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo. Pero todos los métodos ya implementados
// en las homeowrks no es necesario que los vuelvan a definir.
// NO DEBEN MODIFICAR EL ARCHIVO DS.js SINO QUE TODO SU CÓDIGO TENDRÁ QUE ESTAR EN ESTE ARCHIVO checkpoint.js

const { createTestScheduler } = require("jest");
const { Queue, Node, LinkedList, BinarySearchTree } = require("./DS.js");

// ----------------------

// ----- Recursión -----

// EJERCICIO 1
// Implementar la función isAncestor: debe determinar si dado dos nombres de personas las mismas
// son parientes o no (La primera debe ser ancestro de la segunda). La función recibira un objeto
// que va a representar sólo la parte femenina del "arbol genealogico" familiar y será de la siguiente forma:
// const genealogyTree = {
//   "Mona Simpson": [],
//   "Marge Simpson": ["Lisa Simpson", "Maggie Simpson"],
//   "Jacqueline Bouvier": [ "Patty Bouvier", "Marge Simpson", "Selma Bouvier"],
//   "Patty Bouvier": [],
//   "Selma Bouvier": ["Ling Bouvier"],
//   "Edwina": ["Abigail Simpson"],
//   "Lisa Simpson": [],
//   "Maggie Simpson": [],
//   "Ling Bouvier": []
// }
// Ejemplo:
//  - Caso que devuelve true --> isAncestor(genealogyTree, "Jacqueline Bouvier", "Maggie Simpson")
//  - Caso que devuelve false --> isAncestor(genealogyTree, "Jacqueline Bouvier", "Abigail Simpson")
//  [Observar los tests para otros casos]

var isAncestor = function (genealogyTree, ancestor, descendant) {
  // Tu código aca:
  var rta = genealogyTree.hasOwnProperty(ancestor);
  if(rta){
    rta = false;
    for(x in genealogyTree[ancestor]){
      current = genealogyTree[ancestor][x]
      if(current==descendant){
        rta = true;
      }
      else if(genealogyTree.hasOwnProperty(current)){
        rta =  rta || isAncestor(genealogyTree,current,descendant)
      }
    }
  }
  return rta;
};
// EJERCICIO 2
// Secuencia inventada: f(n) = f(n-1) x f(n-2) - f(n-2)
// Siendo F, secuenciaHenry.
// Donde las primeras dos posiciones son dadas por el parametro recibidos y a partir de
// la siguiente se calcula como la multiplicación de los 2 números anteriores restados al número anterior.
// object es un objeto del cual debemos obtener f(0) y f(1) siguiendo la siguiente lógica:
// f(0) será un número igual a la cantidad de propiedades del objeto que sean números
// f(1) será un número igual a la suma de las longitudes de arreglos que sean valores de alguna propiedad
// Por ejemplo si recibimos:
// var obj = {
//   1: true,
//   a: [1,2,3],
//   7: ['F','r','a','n','c','o!'],
//   h: {a: 1},
//   z: []
// }
// deberíamos tener los siguientes 2 valores iniciales
// secuenciaHenry(0) = 2 y secuenciaHenry(1) = 9 (Ya que 1 y 7 son las dos propiedades numéricas y los 3 arreglos que están
// como valores del objeto suman 9 entradas entre los tres (1,2,3,'F','r','a','n','c','o!').
// A partir de ahí la tercera posición sería  9 x 2 - 2 = 16 y así sucesivamente
// La función secuenciaHenry debe devolver el enésimo numero de la serie, por ejemplo para el objeto
// antes mencionado:
// secuencia: 2, 9, 16, 135, 2144, 289305
// secuenciaHenry(0) // 2  ya que el elemento de la posición 0 es 2
// secuenciaHenry(1) // 9 ya que el elemento de la posición 1 es 9
// secuenciaHenry(5) // 289305 ya que el elemento de la posición 5 es 289305

// Para números negativos de n debe devolver null
function secuenciaHenry(obj, n) {
  //f(0)
  if(n<0) return null;
  var firstParam = 0;
  var secondParam =0;
  for(x in obj){
    firstParam = Number.isInteger(Number(x))? firstParam+1:firstParam;
    secondParam = Array.isArray(obj[x])? secondParam+obj[x].length:secondParam;
  }
  if(n == 0){
    return firstParam;
  }
  var cont=0;
  var arr = [firstParam,secondParam]
  var j =1;
  while(n>=cont){
    arr.push((arr[j-1]*arr[j])-arr[j-1])
    j++;
    cont++;
  }
  return arr[n];
}



// ----- LinkedList -------------------------------------------------------------------------------

// EJERCICIO 3
// Implementar el método size dentro del prototype de LinkedList que deberá retornar el tamaño actual de
// la LinkedList. En el caso de que la lista se encuentre vacía deberá retornar cero.
// Ejemplo:
//    var lista = new LinkedList();
//    lista.size(); --> 0
//    lista.add(1);
//    lista.size(); --> 1
//    lista.add(2);
//    lista.add(3);
//    lista.size(); --> 3

LinkedList.prototype.size = function () {
  let size = 0;
  var nodoActual = this.head;
  while (nodoActual) {
    size++;
    nodoActual = nodoActual.next;
  }
  return size;
};

// EJERCICIO 4
// Implementar el método switchPos dentro del prototype de LinkedList que deberá intercambiar
// el elemento que se encuentre en pos1 con el elemento en pos2
// En el caso de que alguna de las dos posiciones no sea válida (Supere el tamaño de la lista actual
// o sea un número negativo) debe devolver false.
// Si los nodos fueron removidos correctamente devolver true.
// Aclaración: la posición cero corresponde al head de la LinkedList
// Ejemplo 1:
//    Suponiendo que la lista actual es: Head --> [1] --> [2] --> [3] --> [4] --> [5]
//    lista.switchPos(1,3);
//    Ahora la lista quedaría: Head --> [1] --> [4] --> [3] --> [2] --> [5]
//    y la función debería haber devuelto true
// Ejemplo 2:
//    Suponiendo que se pide una posición inválida: removeFromPos(8) --> false
// PISTA: Vas a necesitar guardar la referencia a la posición previa y la actual de cada
// nodo a intercambiar

LinkedList.prototype.switchPos = function (pos1, pos2) {
  // Tu código aca:
  if(pos1 > this.size()-1 || pos1 < 0 || pos2 > this.size()-1 || pos2 < 0)
  return false;

var prev = this.head;
var prevIndex = 0;
var current = this.head;
var index = 0;
while(prevIndex<pos1 && prev.next){
  prev = prev.next
  prevIndex++;
}
while(index<pos2 && current.next){
  current = current.next
  index++;
}
aux = prev.value
prev.value = current.value
current.value = aux
return true;
}

// EJERCICIO 5-----------------------------------------------------------------------------------------------------
// Implementar la función mergeLinkedLists que, a partir de dos listas simplemente enlazadas
// del mismo tamaño retorne una nueva lista con los elementos de ambas listas
// Ejemplo:
//    Lista 1: Head --> 1 --> 7 --> 20 --> null
//    Lista 2: Head --> 4 --> 13 --> 2 --> null
//    Lista nueva luego de aplicar mergeLinkedLists:
//             Head --> 1 --> 4 --> 7 --> 13 --> 20 --> 2 --> null
// Nota: las listas enlazadas mergeadas intercalandose.
// El nodo 1 de la lista 1, se conecta con el nodo 1 de la lista 2.
// Continuando con el nodo 2 de la lista 2, conectandose con el nodo 2 de la lista 2.

var mergeLinkedLists = function (linkedListOne, linkedListTwo) {
  // Tu código aca:
  currentOne = linkedListOne.head;
  currentTwo = linkedListTwo.head;
  var rta = new LinkedList()
  while(currentOne){
    rta.add(currentOne.value)
    rta.add(currentTwo.value)
    currentOne = currentOne.next;
    currentTwo = currentTwo.next;
  }
  return rta;
};

// ----- QUEUE --------------------------------------------------------------------------------------------------

// EJERCICIO 6
// Implementar la función cardGame: a partir de dos Queues que va a recibir como paráemtro que
// van a representar mazos de cartas de dos jugadores debemos determinar quien va a ser el ganador
// de este juego que va a tener la siguiente dinámica:
// - Los jugadores tendrán que defender su "Castillo" que contiene un total de 100 puntos de resistencia
// - Cada carta tendrá puntos de ataque (attack), puntos de defensa (defense) y tipo (type)
// - Ambos jugadores van a sacar las dos primeras cartas de su mazo
//      * La primera carta será su carta asignada para atacar
//      * La segunda carta será su carta asignada para defender
// - La carta asignada para atacar del jugador uno se enfrentará contra la carta asignada para defender
//   del jugador dos y viceversa. Si el ataque supera los puntos de defensa el daño sobrante será aplicado
//   sobre el castillo.
// - El tipo de la carta puede ayudar al ataque o la defensa. Existen 3 tipos ('Destructor', 'Protector', 'Neutral')
//      * Destructor: si la carta de ataque contiene este tipo se duplicarán sus puntos de ataque
//      * Protector: si la carta de defensa contiene este tipo se dupicarán sus puntos de defensa
//      * Neutral: Lamentablemente no aporta nada extra
// - El juego finaliza cuando alguno de los dos castillos se quede sin puntos de resistencia o cuando los mazos
//   se acaben. En este último caso ganará aquel jugador que tenga mayor cantidad de puntos de resistencia
//   restantes en su castillo.
// La función deberá devolver on objeto que contenga 3 propiedades:
//  - winner: 'PLAYER ONE' o 'PLAYER TWO' dependiendo quien sea el ganador. En el caso de empate devolver 'TIE'
//  - castleOne: la cantidad de puntos de resistencia finales del player one
//  - castleTwo: la cantidad de puntos de resistencia finales del player two
// NOTA: Ambos mazos contienen la misma cantidad de cartas

// Ejemplo:
// Los jugadores levantan 2 cartas cada uno.
// La primera carta del jugador uno va a atacar a la segunda carta del jugador dos
// La primer carta del jugador dos va a atacar a la segunda carta del jugador uno
//
// La primer carta del jugador 1 es esta{attack: 5, defense: 5, type: 'Protector'}
// Y la segunda {attack: 15, defense: 10, type: 'Neutral'}

// La primer carta del segundo jugador {attack: 10, defense: 26, type: 'Destructor'}
// La segunda carta del segundo jugador {attack: 5, defense: 26, type: 'Neutral'}

// el jugador 1 Ataca con su primer carta a la segunda del jugador 2.
// Como el jugador 1 NO tiene un potenciado de ataque(destructor), no obtiene bonus. Hace 5 de daño, el jugador dos
// tiene 26 de defensa, como no supero el valor de defensa, su castillo no recibe daño

// El segundo jugador ataca con su primer carta a la segunda carta del jugador uno
// La primer carta del jugador dos, tiene el type Destructor, entonces su ataque es 10 * 2, es decir 20.
// y la defensa del jugador uno, su segunda carta, es de 10, y como su tipo es neutral, se mantiene en 10
// el jugador 1 recibe 10 de daño en su castillo.
// Una vez terminado eso, pasa a la siguiente ronda.

var cardGame = function (playerOneCards, playerTwoCards) {
  // Tu código aca:
  var castleOne = 100;
  var castleTwo = 100;
  var attack,defense;
  while(playerOneCards.size()>0){
    var playerOne = [];
    var playerTwo = [];
    //Saco las cartas
    playerOne.push(playerOneCards.dequeue())
    playerOne.push(playerOneCards.dequeue())
    playerTwo.push(playerTwoCards.dequeue())
    playerTwo.push(playerTwoCards.dequeue())

    //Ataca el Player 1
    attack = playerOne[0].type == 'Destructor'? playerOne[0].attack*2:playerOne[0].attack;
    defense = playerTwo[1].type == 'Protector'? playerTwo[1].defense*2:playerTwo[1].defense;
    castleTwo = attack>defense? castleTwo-attack+defense:castleTwo;

    if(castleOne <= 0 || castleTwo <= 0) break;

    //ATACA el Player 1
    attack = playerTwo[0].type == 'Destructor'? playerTwo[0].attack*2:playerTwo[0].attack;
    defense = playerOne[1].type == 'Protector'? playerOne[1].defense*2:playerOne[1].defense;
    castleOne = attack>defense? castleOne-attack+defense:castleOne;

    if(castleOne <= 0 || castleTwo <= 0) break;


  }
  var winner = castleOne==castleTwo?'TIE':castleOne>castleTwo? 'PLAYER ONE': 'PLAYER TWO';
  var rta = {
    winner:winner,
    castleOne: castleOne,
    castleTwo: castleTwo
  };
  return rta
};
// La función deberá devolver on objeto que contenga 3 propiedades:
//  - winner: 'PLAYER ONE' o 'PLAYER TWO' dependiendo quien sea el ganador. En el caso de empate devolver 'TIE'
//  - castleOne: la cantidad de puntos de resistencia finales del player one
//  - castleTwo: la cantidad de puntos de resistencia finales del player two

// El ejercicio de cartas es bastante complejo de entender el flujo, pero de implementar es bastante sencillo.
//  Hay dos jugadores, cada uno tiene un castillo con 100 puntos de vida. En cada turno, deberian sacar 2 cartas
//  cada uno de sus mazos(implementado como una Queue), entonces, si es una Queue, tiene el metodo dequeue.
//  El metodo dequeue les va a devolver la carta. El flujo es el siguiente, con la primer carta del primer jugador,
//  atacan a la segunda del segundo jugador, y con la primera del segundo jugador,  a la segunda del primer jugador.
//  Antes de atacar, van a tener que revisar, si tu carta esta atacando y es del tipo destructor,
//  va a aplicar el doble de daño, y si estas defendiendote, si tu carta es type protector, tiene el doble de defensa.
//  Si el atacante le pega mas daño que la defensa, el resto daño va al castillo.
//  Se itera hasta que no queden mas cartas o el castillo de alguien muera. Y retornan el objeto que les pide
//  el ejercicio.

// ----- BST -------------------------------------------------------------------------------------------------

// EJERCICIO 7
// Implementar la función height dentro del prototype de BinarySearchTree que debe devolver la "altura"
// máxima del arbol recibido por parámetro.
// Ejemplo:
//             16             ---> Nivel 1
//          /      \
//        6         23        ---> Nivel 2
//      /  \       /   \
//     2    14    17    31    ---> Nivel 3
//      \
//       5                    ---> Nivel 4
// Este arbol tiene una altura de 4
// PISTA: Una forma de resolverlo es pensarlo recursivamente y usando Math.max

BinarySearchTree.prototype.height = function () {
  if (!this.value) return 0;
  if (!this.right && !this.left) return 1;
  if (this.left && !this.right) return 1 + this.left.height();
  if (this.right && !this.left) return 1 + this.right.height();
  if (this.left && this.right) {
    return 1 + Math.max(this.left.height(), this.right.height());
  }
};

// Ejercicio 8 ---------------------------------------------------------------------------------------------------

// Dado un arreglo ordenado, encontrar el índice de un elemento específico pasado como parámetro
// utilizando el método conocido como búsqueda binaria. En el caso de que el número buscado no se encuentre
// en el array devolver -1.
// Para mayor información sobre dicho método:
//    - https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search
//    - https://en.wikipedia.org/wiki/Binary_search_algorithm
// Ejemplo:
//    array = [1,2,3,4,5,6,7,8,9,10];
//    binarySearch(array, 2) --> Devolvería 1 ya que array[1] = 2
//    [Donde 2 sería el número sobre el cuál queremos saber su posición en el array]

var binarySearch = function (array, target) {
  // Tu código aca:
  var maximo = array.length - 1;
  var minimo = 0; //<------------------MIN
  var pivot = 0; //<--------------- MI PIVOT

  while (minimo <= maximo) {
    pivot = Math.floor((maximo + minimo) / 2);

    if (array[pivot] === target) {
      return pivot;
    } else if (target > array[pivot]) {
      minimo = pivot + 1;
    } else {
      maximo = pivot - 1;
    }
  }
  return -1;
};

// EJERCICIO 9------------------------------------------------------------------------------------------------

// Ordená un arreglo de objetos usando un bubble sort pero con algunas particularidades.
// Además del arreglo a ordenar (array) la función va a recibir como parámetro una función
// que va a ser quien va a determinar si un elemento es "mayor" al otro para determinar su
// posición final.
// Ejemplo:
// var array = [
//   {name: 'Franco', age: 26, height: 1.85},
//   {name: 'Toni', age: 30, height: 1.75},
//   {name: 'Mati', age: 25, height: 1.77},
//   {name: 'Leo', age: 40, height: 1.83}
// ]
//
// orderFunction(array[0], array[1]) --> Devolvera 1 si están bien ordenados o -1 si hay que intercambiarlos
// Suponiendo que la orderFunction devuelve -1 si la edad del segundo elemento es menor que la del primero
// specialSort(array, orderFunction) --> Retornaría el siguiente array:
// [
//   {name: 'Mati', age: 25, height: 1.77},
//   {name: 'Franco', age: 26, height: 1.85},
//   {name: 'Toni', age: 30, height: 1.75},
//   {name: 'Leo', age: 40, height: 1.83}
// ]

var specialSort = function (array, orderFunction) {
  // Tu código aca:
  var swap = true;
  while (swap) {
    swap = false;
    for (var i = 0; i < array.length - 1; i++) {
      if (orderFunction(array[i], array[i + 1]) === -1) {
        var aux = array[i];
        array[i] = array[i + 1];
        array[i + 1] = aux;
        swap = true;
      }
    }
  }
  return array;
};

// ----- Closures -----------------------------------------------------------------------------------------------

// EJERCICIO 10
// Implementar la función closureDetect que recibe como parámetro:
//  - Un array (symptoms) que va a contener en cada posición un string representando un
//    síntoma médico de alguna enfermedad
//  - Un número (min) que va a indicar la cantidad mínima de síntomas que debe tener un
//    paciente para considerar que posee la enfermedad
// Ejemplos:
//   var symptoms = ['fever', 'dry cough', 'tiredness', 'sore throat', 'diarrhoea', 'loss of taste', 'loss of smell'];
//   var covidDetector = closureDetect(symptoms, 3);
//
//   var personOne = {
//     name: 'Franco',
//     age: 26,
//     symptoms: ['fever', 'congestion', 'loss of taste', 'tiredness']
//   }
//
//   var personTwo = {
//     name: 'Toni',
//     age: 30,
//     symptoms: ['congestion', 'tiredness']
//   }
//
//   covidDetector(personOne); --> true
//   covidDetector(personTwo); --> false
//  [Observar los tests para otros casos]

function closureDetect(symptoms, min) {
  // Tu código aca:
  let arraySintomas = symptoms;

  return function (persona) {
    var count = 0;
    var arregloPersona = persona.symptoms;
    for (let i = 0; i < arregloPersona.length; i++) {
      let tieneSintomas = arraySintomas.includes(arregloPersona[i]);
      if (tieneSintomas) {
        count++;
      }
    }
    if (count >= min) {
      return true;
    }
    return false;
  };
}
// var covidDetector = closureDetect(symptomsCovid, 3);
// var anginaDetector = closureDetect(symptomsAngina, 1)

// -----------------------------------------------------------------------------------------------------------

module.exports = {
  isAncestor,
  secuenciaHenry,
  LinkedList,
  Queue,
  cardGame,
  binarySearch,
  specialSort,
  closureDetect,
  BinarySearchTree,
  mergeLinkedLists,
};
