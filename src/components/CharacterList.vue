<template>
  <span>name</span>
  <input type="radio" v-model="searchKey" v-bind:value="NAME_SEARCH_KEY" checked>
  <span>episode</span>
  <input type="radio" v-model="searchKey" v-bind:value="EPISODE_SEARCH_KEY">
  <br>
  <span>identifier</span>
  <input type="radio" v-model="searchKey" v-bind:value="IDENTIFIER_SEARCH_KEY">
  <br>
  <input type="search" v-model="searchValue" />
  <button @click="searchFromStart">search</button>
  <div v-if="isLoading">
    <img height="220" src="../assets/working-morty.png" alt="Image of exhausted Morty">
  </div>
  <div v-else-if="error">
    {{ error }}
    <img height="220" src="../assets/wrong-morty.png" alt="Image of confused Morty">
  </div>
  <div v-else>
    <div>
      <ul>
        <li v-for="character in charactersToDisplay" :key="character.id">
          <span>{{ character.id }},{{ character.name }}</span>
        </li>
      </ul>
    </div>
  </div>
  <pagination
    :totalPages="totalPages"
    :currentPage="currentPage"
    @pagechanged="onPageChange"
  />
</template>

<script>

import { useSearchCharacters } from "@/componsable/useSearchCharacters";
import { computed, ref } from "vue";
import {
  getFindCharacterByIdQuery,
  getSearchCharactersByEpisodeQuery,
  getSearchCharactersByNameQuery,
  isByEpisodeSearch,
  isByNameSearch
} from "@/utils/graphQlUtils";
import Pagination from "./Pagination";

const NAME_SEARCH_KEY = "name";
const EPISODE_SEARCH_KEY = "episode";
const IDENTIFIER_SEARCH_KEY = "identifier";
const ITEMS_PER_PAGE = 20;

export default {
  name: "CharacterList",
  components: {
    Pagination,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const currentPage = ref(1);
    const searchValue = ref("");
    const searchKey = ref(NAME_SEARCH_KEY);
    const query = computed(() => {
      if (isByEpisodeSearch(searchKey.value)) {
        return getSearchCharactersByEpisodeQuery(searchValue.value);
      }
      if (isByNameSearch(searchKey.value)) {
        return getSearchCharactersByNameQuery(searchValue.value, currentPage.value);
      }
      return getFindCharacterByIdQuery(searchValue.value);
    });
    const charactersToDisplay = computed(() =>
      charactersListPerPageList.value.length ? charactersListPerPageList.value[currentPage.value - 1] : charactersList.value);
    const totalPages = computed(() => Math.ceil(count.value / ITEMS_PER_PAGE));

    const {
      charactersList, charactersListPerPageList, count,
      isLoading, error, search
    } = useSearchCharacters(query);

    const onPageChange = (page) => {
      currentPage.value = page;
      if (isByNameSearch(searchKey.value)) {
        search();
      }
    };
    const searchFromStart = () => {
      currentPage.value = 1;
      search();
    };
    search();

    return {
      onPageChange,
      searchFromStart,
      charactersToDisplay,
      currentPage,
      totalPages,
      searchValue,
      searchKey,
      isLoading,
      error,
      NAME_SEARCH_KEY,
      EPISODE_SEARCH_KEY,
      IDENTIFIER_SEARCH_KEY,
    };
  }
};
</script>

<style scoped></style>
