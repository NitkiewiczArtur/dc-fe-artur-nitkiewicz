import { ComputedRef, isRef, reactive, Ref, ref, toRefs, unref, watch } from "vue";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useCharactersSearch<T>(url: URL | Ref<URL>) {
  const result = ref<T | null>(null);
  const state = reactive({
    isLoading: false,
    error: null as any
  });
  const reload = async () => {
    state.isLoading = true;
    try {
      const response = await fetch(unref(url).toString());
      const responseResult = await response.json();
      result.value = responseResult.results;
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
  };
}

