import { TPokemon } from "pokemon/types";

// TODO: this string randomizer has a chance to return the string in its original order,
// defeating the point of he game. Need to ensure it's always disordered by at least one char
export function shuffleString(input: string): string {
  let a = input.split(""),
    n = a.length;

  for (let i = n - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
}

export function shufflePokemon(initialArray: Array<TPokemon>): Array<TPokemon> {
  let array = [...initialArray];
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    array[i].name = array[i].name.toUpperCase();
    array[i].shuffledName = shuffleString(array[i].name).toUpperCase();
    array[j].name = array[j].name.toUpperCase();
    array[j].shuffledName = shuffleString(array[j].name).toUpperCase();
  }
  return array;
}

export function getRandomPokemon(array: Array<TPokemon>): TPokemon {
  return array.splice(Math.floor(Math.random() * array.length), 1)[0];
}
