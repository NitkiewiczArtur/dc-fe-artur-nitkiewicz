import { Character } from "@/types/Character";

export function useFavourites(store) {
  const getFavouriteCharacters: Character[] = store.getters["characterModule/getFavouriteCharacters"];

  const initFavouriteCharacters = () => {
    store.dispatch("characterModule/initFavouriteCharacters");
  };
  const isFavourite = (characterToFind: Character) => {
    return getFavouriteCharacters ? getFavouriteCharacters.find(character => character.id === characterToFind.id) :
      false;
  };
  const addToFavourites = (character: Character) => {
    store.dispatch("characterModule/addFavouriteCharacter", character).then(() => {
      localStorage.setItem("favouriteCharacters", JSON.stringify(getFavouriteCharacters));
    });
  };
  const removeFromFavourites = (characterToRemove: Character) => {
    store.dispatch("characterModule/removeFavouriteCharacter", characterToRemove).then(() => {
      localStorage.setItem("favouriteCharacters", JSON.stringify(getFavouriteCharacters));
    });
  };
  return {
    initFavouriteCharacters,
    isFavourite,
    addToFavourites,
    removeFromFavourites
  }
}
