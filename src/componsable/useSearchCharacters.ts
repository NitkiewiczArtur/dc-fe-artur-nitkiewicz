import { reactive, Ref, toRefs } from "vue";
import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import _ from "lodash";

const ENDPOINT = "https://rickandmortyapi.com/graphql";
const ITEMS_PER_PAGE = 20;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useSearchCharacters(query: Record<string, unknown> | Ref<Record<string, unknown>>) {
  const state = reactive({
    isLoading: true,
    error: null as any
  });
  const characters: CharactersResponse = reactive({ charactersList: [], charactersListPerPageList: [], count: 0})

  //TODO:CHANGE PAGE I search
  const search = async () => {
    state.error = null;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    characters.charactersList = []
    characters.charactersListPerPageList = []
    state.isLoading = true;
    try {
      const response = await axios.post(ENDPOINT, query.value);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (query.value.query.search("episode") === 5) {
        characters.charactersListPerPageList =
          _.chunk(response.data.data.episodes.results[0].characters, [ITEMS_PER_PAGE]);
        characters.count = response.data.data.episodes.results[0].characters.length;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } else if (query.value.query.search("characters") === 5){
        characters.charactersList = response.data.data.characters.results
        characters.count = response.data.data.characters.info.count;
      }else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
 /* if (isRef(url)) {
    watch(url, search);
  }*/
  return {
    ...toRefs(state),
    ...toRefs(characters),
    search
  }
}
