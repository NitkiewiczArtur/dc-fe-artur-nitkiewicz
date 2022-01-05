<template>
  <div class="navbar-wrapper">
      <img class="logo" src="../assets/logo.png" alt="logo">
    <div class="">
      <search-bar :search-keys="searchKeys"
                  @searchClicked="onSearchClicked"></search-bar>
    </div>
    <div class="switch-field-container">
      <switch-field @fieldSwitched="onFieldSwitched" :values="[ALL_CHARACTERS, FAVOURITES]"></switch-field>
    </div>
  </div>

  <div class="table-wrap fixed-height">
          <table class="table table-borderless font-color">
            <thead class="color-blue">
            <tr>
              <th></th>
              <th>Photo</th>
              <th>Character ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Species</th>
              <th>Last Episode</th>
              <th>Add To Favourite</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr class="border-bottom" v-for="character in charactersToDisplay" :key="character.id">
              <td style="padding-left: 5vw"></td>
              <td>
                <img style="height: 68px;" :src="character.image" alt="character img">
              </td>
              <td>{{character.id}}</td>
              <td>
                {{character.name}}
              </td>
              <td>
                {{character.gender}}
              </td>
              <td>
                {{character.species}}
              </td>
              <td>
                {{character.episode[character.episode.length-1].episode}}
              </td>
              <td v-if="isFavourite(character)">
                <button class="favourite-btn favourite-btn--isFavourite"
                        @click="removeFromFavourites(character)">
                  <i class="material-icons s" aria-hidden="true">star
                  </i>
                </button>
              </td>
              <td v-else>
                <button class="favourite-btn"
                        @click="addToFavourites(character)">
                  <i class="material-icons s" aria-hidden="true">star
                  </i>
                </button>
              </td>
              <td></td>
            </tr>
            </tbody>
          </table>
        <div class="container" v-if="isLoading">
          <img class="image" src="../assets/zmiana-programu.jpg" alt="Image of exhausted Morty">
        </div>
        <div class="container" v-else-if="error">
          {{ error }}
          <img class="image" src="../assets/wrong-morty.jpg" alt="Image of confused Morty">
        </div>
  </div>

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
} from "@/utils/graphQlUtils";
import Pagination from "./Pagination";
import SwitchField from "@/components/SwitchField";
import { useFavourites } from "@/componsable/useFavourites";
import SearchBar from "@/components/SearchBar";
import { usePagination } from "@/componsable/usePagination";

const NAME_SEARCH_KEY = "Name";
const EPISODE_SEARCH_KEY = "Episode";
const IDENTIFIER_SEARCH_KEY = "Identifier";
const searchKeys = [NAME_SEARCH_KEY, EPISODE_SEARCH_KEY, IDENTIFIER_SEARCH_KEY]
const ALL_CHARACTERS = 'All Characters'
const FAVOURITES = 'Favourites'

export default {
  name: "CharacterList",
  components: {
    SearchBar,
    SwitchField,
    Pagination,
  },

  setup() {
    const searchValue = ref("");
    const searchKey = ref(NAME_SEARCH_KEY);
    const favouriteCharacters = ref([]);
    const currentlyOpenedTab = ref(ALL_CHARACTERS);

    const query = computed(() => {
      if (isByEpisodeSearch(searchKey.value)) {
        return getSearchCharactersByEpisodeQuery(searchValue.value);
      }
      if (isByNameSearch(searchKey.value)) {
        return getSearchCharactersByNameQuery(searchValue.value, currentPage.value);
      }
      return getFindCharacterByIdQuery(searchValue.value);
    });
    const charactersToDisplay = computed(() => {
      if (currentlyOpenedTab.value === FAVOURITES) {
        return favouriteCharacters.value;
      } else {
        return charactersListPerPageList.value.length ? charactersListPerPageList.value[currentPage.value - 1] :
          charactersList.value;
      }
    });
    const {
      charactersList, charactersListPerPageList, count,
      isLoading, error, search
    } = useSearchCharacters(query);
    const {
      initFavourites, isFavourite, addToFavourites, removeFromFavourites
    } = useFavourites(favouriteCharacters);
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
      if (selectedValue === FAVOURITES) {
        currentlyOpenedTab.value = FAVOURITES;
      } else {
        currentlyOpenedTab.value = ALL_CHARACTERS;
      }
    }
    const onSearchClicked = (searchKeyToSet, searchValueToSet) => {
      currentPage.value = 1;
      searchKey.value = searchKeyToSet.value;
      searchValue.value = searchValueToSet.value;
      search();
    };

    initFavourites();
    search();

    return {
      charactersToDisplay,
      currentPage,
      currentlyOpenedTab,
      totalPages,
      isLoading,
      error,
      favouriteCharacters,
      maxVisibleConsecutivePageButtons,
      isFavourite,
      onPageChange,
      onFieldSwitched,
      onSearchClicked,
      addToFavourites,
      removeFromFavourites,
      searchKeys,
      ALL_CHARACTERS,
      FAVOURITES
    };
  }
};
</script>

<style scoped lang="scss">

.image {
  width: 100%;
}

.fixed-height {
  height: 100%;
}

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

.color-blue {
  background-color: rgb(229, 234, 244, 0.25)
}

.favourite-btn {
  width: 40px;
  height: 40px;
  background-color: white;
  color: #11B0C8;
  border: #11B0C8 solid 3px;
  border-radius: 5px;
  padding-top: 7px;

  &--isFavourite {
    background-color: #11B0C8;
    border: #11B0C8 solid 3px;
    color: white;
  }
}

.border-bottom {
  border-bottom: #A9B1BD solid 0.25px;
}

@media (max-width: 767px) {
  .searchBar {
    left: 80px;
    top: 138px;
  }
  .table-wrap table,
  .table-wrap thead,
  .table-wrap tbody,
  .table-wrap th,
  .table-wrap td,
  .table-wrap tr {
    display: block;
  }
  .table-wrap thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  .table-wrap td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 40% !important;
    white-space: normal;
    text-align: left;
  }
  .table-wrap td:before {
    position: absolute;
    top: 8px;
    left: 15px;
    width: 45%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    font-weight: bold;
  }
  .table-wrap td:first-child {
    padding-top: 17px;
  }
  .table-wrap td:last-child {
    padding-bottom: 16px;
  }
  .table-wrap td:first-child:before {
    top: 17px;
  }
  .table-wrap td:before {
    content: attr(data-title);
  }
  .table tbody tr {
    border-top: 1px solid #ddd;
  }
  .table tbody tr td {
    border: none;
  }
}
</style>

