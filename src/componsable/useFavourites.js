// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useFavourites(favouriteCharacters) {
  const initFavourites = () => {
    favouriteCharacters.value = JSON.parse(localStorage.getItem("favouriteCharacters") || "[]");
  }
  const isFavourite = (characterToFind) => {
    return favouriteCharacters.value.find(character => character.id === characterToFind.id)
  }
  const addToFavourites = (character) => {
    favouriteCharacters.value.push(character)
    favouriteCharacters.value =_.uniqBy(favouriteCharacters.value, 'id');
    localStorage.setItem("favouriteCharacters", JSON.stringify(favouriteCharacters.value))
  }
  const removeFromFavourites = (characterToRemove) => {
    favouriteCharacters.value = favouriteCharacters.value.filter(character => character.id !== characterToRemove.id)
    localStorage.setItem("favouriteCharacters", JSON.stringify(favouriteCharacters.value))
  }
  return {
    initFavourites,
    isFavourite,
    addToFavourites,
    removeFromFavourites
  }
}
