import { reactive, Ref, toRefs } from "vue";
import axios from "axios";
// @ts-ignore
import _ from "lodash";

const ENDPOINT = "https://rickandmortyapi.com/graphql";
const ITEMS_PER_PAGE = 20;

export function useSearchCharacters(query: Record<string, unknown> | Ref<Record<string, unknown>>) {
  const state = reactive({
    isLoading: true,
    error: null as any
  });
  const characters: CharactersResponse = reactive({ charactersList: [], charactersListPerPageList: [], count: 0})

  //TODO:CHANGE PAGE I search
  const search = async () => {
    state.error = null;
    characters.charactersList = []
    characters.charactersListPerPageList = []
    state.isLoading = true;
    try {
      const response = await axios.post(ENDPOINT, query.value);

      // @ts-ignore
      if (query.value.query.search("episode") === 5) {
        characters.charactersListPerPageList =
          _.chunk(response.data.data.episodes.results[0].characters, [ITEMS_PER_PAGE]);
        characters.count = response.data.data.episodes.results[0].characters.length;
        // @ts-ignore
      } else if (query.value.query.search("characters") === 5){
        characters.charactersList = response.data.data.characters.results
        characters.count = response.data.data.characters.info.count;
      }else {
        // @ts-ignore
        characters.charactersList = [response.data.data.character]
        characters.count = 1
      }
    } catch (e) {
      state.error = e;
    } finally {
      state.isLoading = false;
    }
  };

  return {
    ...toRefs(state),
    ...toRefs(characters),
    search
  }
}
