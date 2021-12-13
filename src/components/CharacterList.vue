<template>
  <div class="container">
    <div class="row header">
      <div class="col-12 col-lg-3 col-xl-3">
      <img class="logo" src="../assets/logo.png" alt="logo">
      </div>

      <div class="col-12 col-lg-6 col-xl-4">
      <search-bar :search-keys="[NAME_SEARCH_KEY, EPISODE_SEARCH_KEY, IDENTIFIER_SEARCH_KEY]" @searchClicked="onSearchClicked"></search-bar>
      </div>
    <div class="row">
      <switch-field @fieldSwitched="onFieldSwitched" :values="[ALL_CHARACTERS, FAVOURITES]"></switch-field>
    </div>
    </div>
  </div>
      <div class="table-wrap">
          <table class="table table-borderless">
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
                <img style="height: 60px" :src="character.image" alt="character img">
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
          <img width="1000" src="../assets/zmiana-programu.jpg" alt="Image of exhausted Morty">
        </div>
        <div class="container" v-else-if="error">
          {{ error }}
          <img src="../assets/wrong-morty.jpg" alt="Image of confused Morty">
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
import SwitchField from "@/components/SwitchField";
import { useFavourites } from "@/componsable/useFavourites";
import SearchBar from "@/components/SearchBar";

const NAME_SEARCH_KEY = "Name";
const EPISODE_SEARCH_KEY = "Episode";
const IDENTIFIER_SEARCH_KEY = "Identifier";
const ITEMS_PER_PAGE = 20;
const ALL_CHARACTERS = 'All Characters'
const FAVOURITES = 'Favourites'

export default {
  name: "CharacterList",
  components: {
    SearchBar,
    SwitchField,
    Pagination,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const currentPage = ref(1);
    const searchValue = ref("");
    const searchKey = ref(NAME_SEARCH_KEY);
    const favouriteCharacters = ref([]);
    const currentlyOpenedTab = ref('All Characters');

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
    const totalPages = computed(() => Math.ceil(count.value / ITEMS_PER_PAGE));

    const {
      charactersList, charactersListPerPageList, count,
      isLoading, error, search
    } = useSearchCharacters(query);
    const { initFavourites, isFavourite, addToFavourites, removeFromFavourites } = useFavourites(favouriteCharacters);

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
      searchValue,
      searchKey,
      isLoading,
      error,
      favouriteCharacters,
      isFavourite,
      onPageChange,
      onFieldSwitched,
      onSearchClicked,
      addToFavourites,
      removeFromFavourites,
      NAME_SEARCH_KEY,
      EPISODE_SEARCH_KEY,
      IDENTIFIER_SEARCH_KEY,
      ALL_CHARACTERS,
      FAVOURITES
    };
  }
};
</script>

<style scoped lang="scss">

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


.logo{
  width: 240px;
  height: 70px;
}
.header {
  margin: 32px 20px;
}
/*.searchBar li:hover .dropdown > li {
  display: block;
  top: 0;
}*/
@media (max-width: 767px) {
  .searchBar{
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
    padding-left: 50%!important;
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
