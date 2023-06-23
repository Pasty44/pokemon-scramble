import gen1 from "pokemon/gen1";
import gen2 from "pokemon/gen2";
import gen3 from "pokemon/gen3";
import gen4 from "pokemon/gen4";
import gen5 from "pokemon/gen5";
import gen6 from "pokemon/gen6";
import gen7 from "pokemon/gen7";
import gen8 from "pokemon/gen8";
import { TPokemon } from "pokemon/types";

const allPokemon: { [key: string]: Array<TPokemon> } = {
  "1": gen1,
  "2": gen2,
  "3": gen3,
  "4": gen4,
  "5": gen5,
  "6": gen6,
  "7": gen7,
  "8": gen8,
};

export default allPokemon;
