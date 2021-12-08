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
  <div v-if="isLoading">
    CZEKAJ!
  </div>
  <template v-else>
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
  </template>
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

import { useSearch, useSearchCharacters } from "@/componsable/useCharacters";
import { computed, ref } from "vue";


const NAME_SEARCH_KEY = "name";
const EPISODE_SEARCH_KEY = "episode";
const IDENTIFIER_SEARCH_KEY = "identifier";
export default {
  name: "CharacterList",
  methods: {},
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const searchValue = ref("");
    const searchKey = ref(NAME_SEARCH_KEY);
    const page = ref(1);
    const query = computed(() => {
      if (searchKey.value === EPISODE_SEARCH_KEY) {
        return {
          query: `{
   episodes (filter: {episode: "${searchValue.value}"}){
    info {
      count
    }
    results {
      name,
      episode,
      characters {
        name,
        image,
        gender,
        species,
        episode{
          episode
        }
      }
    }
  }
}`
        };
      }
      return {
        query: `{
   characters( filter: { name: "${searchValue.value}"}) {
    info {
      count
    }
    results {
      name,
      image,
     	gender,
      species,
      episode {
        episode
      }
    }
  }
  }`
      };
    });
    const { result: list, isLoading, error, reload } = useSearchCharacters(query);

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
      IDENTIFIER_SEARCH_KEY,
      query
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
  /* const url = computed(() => {
     console.log('computed tera')
     const url = new URL(`${API}`);
     if (searchKey.value !== EPISODE_SEARCH_KEY) {
       url.href = url.href + "character/";
     }
     if(searchKey.value === NAME_SEARCH_KEY){
       console.log("searchValue.value === NAME_SEARCH_KEY");
       url.searchParams.append("name", searchValue.value);
     }
     if (searchKey.value !== IDENTIFIER_SEARCH_KEY) {
       url.searchParams.append("page", page.value.toString());
     } else {
       url.href = url.href + searchValue.value;
     }
     return url;
   });*/

};
</script>

<style scoped></style>
