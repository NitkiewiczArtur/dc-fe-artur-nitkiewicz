import { reactive, Ref, ref, toRefs } from "vue";
import axios from "axios";

const endpoint = "https://rickandmortyapi.com/graphql";
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useSearchCharacters<T>(query: Record<string, unknown> | Ref<Record<string, unknown>>) {
  const result = ref<T | null>(null);
  const state = reactive({
    isLoading: true,
    error: null as any
  });
  const reload = async () => {
    console.log("query");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log(query.value);
    state.isLoading = true;
    try {
      //const response = await fetch(unref(url).toString());
      const response = await axios.post(endpoint, query.value);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (query.value.query.search("episode") === 5) {
        result.value = response.data.data.episodes.results[0].characters;
      } else {
        result.value = response.data.data.characters.results;
      }
    } catch (e) {
      state.error = e;
    } finally {
      state.isLoading = false;
    }
  };
 /* if (isRef(url)) {
    watch(url, reload);
  }*/
  return {
    ...toRefs(state),
    result,
    reload
  }
}
