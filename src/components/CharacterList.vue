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

  <div v-if="isLoading">
    <img height="220" src="../assets/working-morty.png" alt="Image of exhausted Morty">
  </div>
  <div v-else-if="error">
    {{ error }}
    <img height="220" src="../assets/wrong-morty.png" alt="Image of confused Morty">
  </div>

  <div v-else>
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
              <td>
                <button class="favourite-btn">
                  <i class="material-icons s" aria-hidden="true">star
                  </i>
                </button>
              </td>
              <td></td>
            </tr>
            </tbody>
          </table>
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

const NAME_SEARCH_KEY = "Name";
const EPISODE_SEARCH_KEY = "Episode";
const IDENTIFIER_SEARCH_KEY = "Identifier";
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
