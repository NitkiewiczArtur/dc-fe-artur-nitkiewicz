import { Character } from "@/types/Character";

const state = {
  favouriteCharacters: [],
  charactersFromEpisodePaginated: [],
  characters: [],
  count: Number
};
const getters = {
  getFavouriteCharacters(state): Character[] {
    return state.favouriteCharacters;
  },
  getCharactersFromEpisodePaginated(state): Character[][] {
    return state.charactersFromEpisodePaginated;
  },
  getCharacters(state): Character[] {
    return state.characters;
  },
  getCount(state): number {
    return state.count;
  }
};
const mutations = {
  setFavouriteCharacters(state, favouriteCharacters: Character[]) {
    state.favouriteCharacters = favouriteCharacters;
  },
  addFavouriteCharacter(state, characterToAdd: Character) {
    state.favouriteCharacters.push(characterToAdd);
  },
  removeFavouriteCharacter(state, characterToRemove: Character) {
    state.favouriteCharacters = state.favouriteCharacters.filter(character => character.id !== characterToRemove.id);
  },
  setCharactersFromEpisodePaginated(state, charactersFromEpisode: Character[]) {
    state.charactersFromEpisodePaginated = charactersFromEpisode;
  },
  setCharacters(state, characters: Character[]) {
    state.characters = characters;
  },
  emptyCharactersAndCharactersFromEpisodeState(state) {
    state.characters.length = 0;
    state.charactersFromEpisodePaginated.length = 0
    state.count = 0
  },
  setCount(state, count: number) {
    state.count = count;
  }
};
const actions = {
  initFavouriteCharacters({ commit }) {
    const favouriteCharactersFromLocalStorage = localStorage.getItem("favouriteCharacters") !== "undefined" ?
      JSON.parse(
        localStorage.getItem("favouriteCharacters"))
      :
      [];
    commit("setFavouriteCharacters", favouriteCharactersFromLocalStorage);
  },
  addFavouriteCharacter({ commit }, characterToAdd): Promise<any> {
    return new Promise((resolve) => {
      resolve(commit("addFavouriteCharacter", characterToAdd));
    });
  },
  removeFavouriteCharacter({ commit }, characterToRemove): Promise<any> {
    return new Promise((resolve) => {
      resolve(commit("removeFavouriteCharacter", characterToRemove));
    });
  },
  setCharacters({ commit }, characters: Character[]) {
    commit("setCharacters", characters);
  },
  setCharactersFromEpisodePaginated({ commit }, charactersPaginated: Character[][]) {
    commit("setCharactersFromEpisodePaginated", charactersPaginated);
  },
  setCount({ commit }, count: number) {
    commit("setCount", count);
  },
  emptyCharactersAndCharactersFromEpisodeState({ commit}) {
    commit("emptyCharactersAndCharactersFromEpisodeState")
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
