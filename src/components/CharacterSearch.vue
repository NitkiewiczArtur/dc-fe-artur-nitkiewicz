<template>
  <div class="navbar-wrapper">
    <img class="logo" src="../assets/logo.png" alt="logo"
         @click="searchFromStart">
    <div>
      <search-bar :search-keys="searchKeys"
                  @searchClicked="onSearchClicked" />
    </div>
    <div class="switch-field-container">
      <switch-field @fieldSwitched="onFieldSwitched" :values="[ALL_CHARACTERS, FAVOURITES]" />
    </div>
  </div>
  <character-table
    :characters-to-display="charactersToDisplay"
    :is-loading="isLoading"
    :error="error"
  />
  <pagination v-show="currentlyOpenedTab !== FAVOURITES"
              :totalPages="totalPages"
              :currentPage="currentPage"
              :max-visible-consecutive-page-buttons="maxVisibleConsecutivePageButtons"
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
} from "@/utils/rickAndMortyApiUtils";
import SearchBar from "@/components/SearchBar";
import SwitchField from "@/components/SwitchField";
import CharacterTable from "@/components/CharacterTable";
import Pagination from "./Pagination";
import { useFavourites } from "@/componsable/useFavourites";
import { usePagination } from "@/componsable/usePagination";
import { useStore } from "vuex";

const NAME_SEARCH_KEY = "Name";
const EPISODE_SEARCH_KEY = "Episode";
const IDENTIFIER_SEARCH_KEY = "Identifier";
const searchKeys = [NAME_SEARCH_KEY, EPISODE_SEARCH_KEY, IDENTIFIER_SEARCH_KEY]
const ALL_CHARACTERS = 'All Characters'
const FAVOURITES = 'Favourites'

export default {
  name: "CharacterSearch",
  components: {
    CharacterTable,
    SearchBar,
    SwitchField,
    Pagination
  },

  setup() {
    const store = useStore();
    const searchValue = ref("");
    const searchKey = ref(NAME_SEARCH_KEY);
    const currentlyOpenedTab = ref(ALL_CHARACTERS);
    const favouriteCharacters = computed(() => store.getters["characterModule/getFavouriteCharacters"]);
    const characters = computed(() => store.getters["characterModule/getCharacters"]);
    const charactersFromEpisodePaginated = computed(() => store.getters["characterModule/getCharactersFromEpisodePaginated"]);
    const count = computed(() => store.getters["characterModule/getCount"]);

    const query = computed(() => {
      if (isByEpisodeSearch(searchKey.value)) {
        return {
          query: getSearchCharactersByEpisodeQuery(searchValue.value),
          searchKey: searchKey.value
        };
      }
      if (isByNameSearch(searchKey.value)) {
        return {
          query: getSearchCharactersByNameQuery(searchValue.value, currentPage.value),
          searchKey: searchKey.value
        };
      }
      return {
        query: getFindCharacterByIdQuery(searchValue.value),
        searchKey: searchKey.value
      };
    });
    const charactersToDisplay = computed(() => {
      if (currentlyOpenedTab.value === FAVOURITES) {
        return favouriteCharacters.value;
      } else {
        return charactersFromEpisodePaginated.value.length ?
          charactersFromEpisodePaginated.value[currentPage.value - 1] :
          characters.value;
      }
    });
    const {
      isLoading, error, search
    } = useSearchCharacters(store, query);
    const {
      initFavouriteCharacters
    } = useFavourites(store);
    const {
      currentPage,
      totalPages,
      maxVisibleConsecutivePageButtons
    } = usePagination(count);

    const onPageChange = (page) => {
      currentPage.value = page;
      if (isByNameSearch(searchKey.value)) {
        search();
      }
    };
    const onFieldSwitched = (selectedValue) => {
      currentlyOpenedTab.value = selectedValue;
    };
    const onSearchClicked = (searchKeyToSet, searchValueToSet) => {
      currentPage.value = 1;
      searchKey.value = searchKeyToSet.value;
      searchValue.value = searchValueToSet.value;
      search();
    };
    const searchFromStart = () => {
      currentPage.value = 1;
      searchKey.value = NAME_SEARCH_KEY;
      searchValue.value = "";
      search();
    };

    initFavouriteCharacters();
    search();

    return {
      charactersToDisplay,
      currentPage,
      currentlyOpenedTab,
      totalPages,
      isLoading,
      error,
      maxVisibleConsecutivePageButtons,
      onPageChange,
      onFieldSwitched,
      onSearchClicked,
      searchFromStart,
      searchKeys,
      ALL_CHARACTERS,
      FAVOURITES,
    };
  }
};
</script>

<style scoped lang="scss">
.navbar-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.switch-field-container {
  margin-top: 30px;
}

.logo {
  width: 240px;
  height: 70px;
  margin: 40px 0 30px 20px;
}

@media screen and (min-width: 550px) {
  .navbar-wrapper {
    flex-direction: column;
    align-items: center;
  }
}

@media screen and (min-width: 810px) {
  .switch-field-container {
    margin-top: 0;
    position: absolute;
    top: 150px
  }
  .navbar-wrapper {
    flex-direction: row;
    padding-bottom: 50px;
    margin: 32px 0 50px 50px;
    justify-content: initial;
  }
  .logo {
    margin: 0 40px 0 0;
  }
}

</style>

