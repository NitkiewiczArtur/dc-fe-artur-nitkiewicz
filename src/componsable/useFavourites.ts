import { Character } from "@/types/Character";
import {computed, ComputedRef} from "vue";

export function useFavourites(store) {
  const favouriteCharacters: ComputedRef<Character[]> =
      computed(()=> store.getters["characterModule/getFavouriteCharacters"]);

  const initFavouriteCharacters = () => {
    store.dispatch("characterModule/initFavouriteCharacters");
  };
  const isFavourite = (characterToFind: Character) => {
    return favouriteCharacters.value ? favouriteCharacters.value.find(character => character.id === characterToFind.id) :
      false;
  };
  const addToFavourites = (character: Character) => {
    store.dispatch("characterModule/addFavouriteCharacter", character).then(() => {
      localStorage.setItem("favouriteCharacters", JSON.stringify(favouriteCharacters.value));
    });
  };
  const removeFromFavourites = (characterToRemove: Character) => {
    store.dispatch("characterModule/removeFavouriteCharacter", characterToRemove).then(() => {
      localStorage.setItem("favouriteCharacters", JSON.stringify(favouriteCharacters.value));
    });
  };
  return {
    initFavouriteCharacters,
    isFavourite,
    addToFavourites,
    removeFromFavourites
  }
}
