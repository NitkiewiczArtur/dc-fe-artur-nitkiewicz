<template>
<!--  <div
    v-if="charactersDownloading"
  >
    Characters are being downloaded...
  </div>
  <div
    v-else-if="characters.length === 0"
  >
    No characters are here... yet.
  </div>
  <template v-else>
    -->
  <span>name</span>
  <input type="radio" v-model="searchKey" v-bind:value="NAME_SEARCH_KEY" checked>
  <span>episode</span>
  <input type="radio" v-model="searchKey" v-bind:value="EPISODE_SEARCH_KEY">
  <br>
  <span>identifier</span>
  <input type="radio" v-model="searchKey" v-bind:value="IDENTIFIER_SEARCH_KEY">
  <br>
  <input type="search" v-model="searchValue" />
  <input type="text" v-model="page" />
  <button @click="reload">search</button>
  <div>
    <ul>
      <li v-for="character in list" :key="character.id">
        <span>{{ character.id }},{{ character.name }}</span>
      </li>
    </ul>

    <!--    <AppPagination
          :count="articlesCount"
          :page="page"
          @page-change="changePage"
        />-->

  </div>
  <!--
      <button @click="toggleExpand">{{ searchOptions.value.searchKey.value }}</button>
      <div v-if="isSearchKeyExpanded.value">
        <button @click="setKey">Name</button>
        <button @click="setKey">Identifier</button>
        <button @click="setKey">Episode</button>
      </div>
      <input type="search" v-model="searchOptions.value.searchValue.value" />
      <input type="text" v-model="searchOptions.value.page.value" />
      <button @click="search">search</button>
      <ul>
        <li v-for="item in characters" :key="item.id">
          <span>{{ item.id }},{{ item.name }}</span>
        </li>
      </ul>
    </div>-->
</template>

<script>

import { useCharactersSearch } from "@/componsable/useCharacters";
import { computed, ref } from "vue";

const NAME_SEARCH_KEY = "name";
const EPISODE_SEARCH_KEY = "episode";
const IDENTIFIER_SEARCH_KEY = "identifier"
const API = `https://rickandmortyapi.com/api/`
export default {
  name: "CharacterList",
  methods: {
    /* async search() {
       BASE_URL.searchParams.set("page", this.searchOptions.value.page.value);
       BASE_URL.searchParams.set("name", this.searchOptions.value.searchValue.value);
       BASE_URL.searchParams;
       await axios.get(BASE_URL.toString()).then((response) => {
         this.searchOptions.value.count = response.data.info.count;
         this.searchOptions.value.pages = response.data.info.pages;
         this.characters = response.data.results;
       });
     }*/
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup () {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const searchValue = ref("");
    const searchKey = ref(NAME_SEARCH_KEY);
    const page = ref(1);
  /*  const searchParam = computed(() => {
      if (searchKey.value === "name") {
        return `name=`;
      }
      return "";
    })
    const endpointResource = computed(() => {
      if (searchKey.value === "episode") {
        return 'episode/'
      }else {
        return 'character/'
      }
    })
    const paginationParam = computed(() =>{
      if(searchKey.value === 'identifier'){
        return ``
      }
      return `?page=${page.value}&`
    })*/
    const url = computed(() => {
      console.log('computed tera')
      const url = new URL(`${API}`);
      if (searchKey.value !== EPISODE_SEARCH_KEY) {
        url.href = url.href + "character/";
      }
      if(searchKey.value === NAME_SEARCH_KEY){
        console.log('searchValue.value === NAME_SEARCH_KEY')
        url.searchParams.append("name", searchValue.value);
      }
      if(searchKey.value !== IDENTIFIER_SEARCH_KEY){
        url.searchParams.append('page', page.value.toString())
      }else {
        url.href = url.href + searchValue.value
      }
      return url;
    });

    const { result: list, isLoading, error, reload } = useCharactersSearch(url);
    reload();
    return {
      list,
      reload,
      isLoading,
      error,
      searchValue,
      searchKey,
      page,
      NAME_SEARCH_KEY,
      EPISODE_SEARCH_KEY,
      IDENTIFIER_SEARCH_KEY
    };
  }

  /*// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    setup() {
      const  {
        fetchCharacters,
        characters
      } = useCharacters()

      await fetchCharacters()

      return{
        characters
      }
    }*/
};
</script>

<style scoped></style>
