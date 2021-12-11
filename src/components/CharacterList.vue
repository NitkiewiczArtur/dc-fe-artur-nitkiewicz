<template>
  <div class="searchBar">
    <ul>
      <li><span>Search by</span></li>
      <li><span v-text="searchKey" />
        <ul class="dropdown">
          <li><span @click="setSearchKey(NAME_SEARCH_KEY)">Name</span>
          </li>
          <li>
            <span @click="setSearchKey(EPISODE_SEARCH_KEY)">Episode</span>
          </li>
          <li>
            <span @click="setSearchKey(IDENTIFIER_SEARCH_KEY)">Identifier</span>
          </li>
        </ul>
      </li>
      <li>
        <input type="search" v-model="searchValue" />
      </li>
      <li><span @click="searchFromStart"><i class="material-icons s" aria-hidden="true"
      >search</i
      ></span></li>
    </ul>
  </div>


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
          <span>{{ character.name }}</span>
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
<style scoped lang="scss">
.searchBar{
  height: 10vh;
  width: 50vw;
  padding: 0;
}
.searchBar span{
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-decoration: none;

  /*
  display: inline-flex;
  background-color: #4AAE9B;
  padding: 11px;
  justify-content: center;
  border: solid 2px black;*/
}
.searchBar ul {
    list-style: none;
    display: flex;
  padding: 0;
  border-radius: 25px;
  border: solid 2px black;
}
.searchBar li{
  position: relative;
  width: 100%;
  text-align: center;
  width: auto;
  border-right: solid 2px black;
}
.searchBar li:hover .dropdown > li{
  display: block;
  top: 0;
}
.dropdown li{
  display: none;
  position: relative;
}
.dropdown{
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.dropdown {
  display: flex;
  flex-direction: column;

  &__content {
    display: flex;
    flex-direction: column;
  }
}
</style>

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

    const setSearchKey = (searchKeyToSet) => {
      searchKey.value = searchKeyToSet;
    };
    const showSearchBy = ref(false);
    const toggleShowSearchBy = () => {
      showSearchBy.value = !showSearchBy.value;
    };
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
      showSearchBy,
      toggleShowSearchBy,
      setSearchKey,
      NAME_SEARCH_KEY,
      EPISODE_SEARCH_KEY,
      IDENTIFIER_SEARCH_KEY
    };
  }
};
</script>
