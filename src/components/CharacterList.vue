<template>
  <div class="header">
    <img class="logo" src="../assets/logo.png" alt="logo">
    <div class="searchBarContainer">
      <ul class="searchBar">
        <li class="searchBar__item searchBar__item--title">
          <p>Search by</p>
        </li>
        <li class="searchBar__item searchBar__item--dropdown"><p v-text="searchKey" />
          <ul class="dropdown-list">
            <li class="dropdown-list__item">
              <p @click="setSearchKey(NAME_SEARCH_KEY)">Name</p>
            </li>
            <li class="dropdown-list__item">
              <p @click="setSearchKey(EPISODE_SEARCH_KEY)">Episode</p>
            </li>
            <li class="dropdown-list__item">
              <p @click="setSearchKey(IDENTIFIER_SEARCH_KEY)">Identifier</p>
            </li>
          </ul>
        </li>
        <li class="searchBar__item">
          <div class="">
            <input type="search" v-model="searchValue" />
            <span class="searchBar__text" @click="searchFromStart">
        <i class="material-icons s blue" aria-hidden="true">search</i>
        </span>
          </div>
        </li>
      </ul>
    </div>
  </div>



    <switch-field @fieldSwitched="onFieldSwitched" :values="[ALL_CHARACTERS, FAVOURITES]"></switch-field>

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
import _ from "lodash";
import SwitchField from "@/components/SwitchField";

const NAME_SEARCH_KEY = "Name";
const EPISODE_SEARCH_KEY = "Episode";
const IDENTIFIER_SEARCH_KEY = "Identifier";
const ITEMS_PER_PAGE = 20;
const ALL_CHARACTERS = 'All Characters'
const FAVOURITES = 'Favourites'

export default {
  name: "CharacterList",
  components: {
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
const key2 = ref('All Characters')
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
        return charactersListPerPageList.value.length ? charactersListPerPageList.value[currentPage.value - 1] : charactersList.value;
      }
    });
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
    const onFieldSwitched = (selectedValue) => {
      if(selectedValue === FAVOURITES) {
        currentlyOpenedTab.value = FAVOURITES;
      }else{
        currentlyOpenedTab.value = ALL_CHARACTERS;
      }
    }
    const searchFromStart = () => {
      currentPage.value = 1;
      search();
    };
    const setSearchKey = (searchKeyToSet) => {
      searchKey.value = searchKeyToSet;
    };
    const isFavourite = (characterToFind) => {
      return favouriteCharacters.value.find(character => character.id === characterToFind.id)
    }
    const addToFavourites = (character) => {
      favouriteCharacters.value.push(character)
      favouriteCharacters.value =_.uniqBy(favouriteCharacters.value, 'id');
      localStorage.setItem("favouriteCharacters", JSON.stringify(favouriteCharacters.value))
    }
    const removeFromFavourites = (characterToRemove) => {
      favouriteCharacters.value = favouriteCharacters.value.filter(character => character.id !== characterToRemove.id)
      localStorage.setItem("favouriteCharacters", JSON.stringify(favouriteCharacters.value))
    }


    favouriteCharacters.value = JSON.parse(localStorage.getItem("favouriteCharacters") || "[]");
    search();

    return {
      key2,
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
      setSearchKey,
      searchFromStart,
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

.searchBarContainer {
  height: 10vh;
  width: 50vw;
  min-width: 520px;
  padding: 0;
}

.searchBar {
  /* width: 26vw;
   height: 5vh;*/
  list-style: none;
  display: flex;
  padding: 0;
  border-radius: 10px;
  position: absolute;
  width: 505px;
  height: 56px;
  left: 460px;
  top: 38px;
  border: solid 2px #A9B1BD;
  box-sizing: unset;
  &__item {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    border-right: solid 2px #A9B1BD;
    height: 56px;

    &:hover{
      color: #A9B1BD;
    }
    & p {
      margin: 0;
    }
    & input {
      margin-left: 20px;
      outline: none;
      border: none;
    }
    & i {

    }
    &--title {
      width: 124px;
      text-align: center;
    }

    &--dropdown {
      width: 128px;
      padding-left: 20px;
    }

    &:last-child {
      border-right: none;
    }

    &:hover .dropdown-list__item {
      display: flex;
      justify-content: center;
      align-content: center;
      flex-direction: column;
      top: 0;
      height: 54px;
      border-bottom: solid 2px #A9B1BD;
    }
    &:hover .dropdown-list{
      border: solid 2px #A9B1BD;
    }
  }
}

.dropdown-list {
  position: relative;
  top:100px;
  left: -20px;
  flex-direction: column;
  width: 128px;
  padding-left: 20px;
  background-color: white;
  &__item {

    display: none;

  }
  &:hover{
    border: solid 2px #A9B1BD;
  }
}
.logo{
  position: absolute;
  width: 240px;
  height: 70px;
  left: 140px;
  top: 32px;
}
.header {
  margin: 32px 20px;
  display: inline-flex;
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
