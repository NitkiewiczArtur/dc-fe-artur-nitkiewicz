import { reactive, Ref, toRefs } from "vue";
import axios from "axios";
import { Store } from "vuex";

import {
  getCharacterFromSearchByIdResponse,
  getCharactersCountFromSearchByEpisodeResponse,
  getCharactersCountFromSearchByNameResponse,
  getCharactersFromSearchByNameResponse,
  getCharactersPaginatedFromSearchByEpisodeResponse
} from "@/utils/rickAndMortyApiUtils";
import { CharactersQuery } from "@/types/CharactersQuery";

const ENDPOINT = "https://rickandmortyapi.com/graphql";
const ITEMS_PER_PAGE = 20;

export function useSearchCharacters(store: Store<any>, charactersQuery: Ref<CharactersQuery>) {
  const state = reactive({
    isLoading: true,
    error: null as any
  });

  const search = async () => {
    state.error = null;
    state.isLoading = true;
    await store.dispatch("characterModule/emptyCharactersAndCharactersFromEpisodeState");
    try {
      const response = await axios.post(ENDPOINT, charactersQuery.value.query);
      if (charactersQuery.value.searchKey === "Episode") {
        await store.dispatch("characterModule/setCharactersFromEpisodePaginated",
          getCharactersPaginatedFromSearchByEpisodeResponse(response, ITEMS_PER_PAGE));
        await store.dispatch("characterModule/setCount",
          getCharactersCountFromSearchByEpisodeResponse(response));
      } else if (charactersQuery.value.searchKey === "Name") {
        await store.dispatch("characterModule/setCharacters",
          getCharactersFromSearchByNameResponse(response));
        await store.dispatch("characterModule/setCount",
          getCharactersCountFromSearchByNameResponse(response));
      } else {
        await store.dispatch("characterModule/setCharacters",
          [getCharacterFromSearchByIdResponse(response)]);
        await store.dispatch("characterModule/setCount", 1);
      }
    } catch (e) {
      state.error = e;
    } finally {
      state.isLoading = false;
    }
  };

  return {
    ...toRefs(state),
    search
  }
}
