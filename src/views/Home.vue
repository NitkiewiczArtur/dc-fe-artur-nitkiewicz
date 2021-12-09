<template>
  <div class="home">
    <search-bar></search-bar>
    <character-list></character-list>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CharacterList from "@/components/CharacterList.vue";
import SearchBar from "@/components/SearchBar.vue"; // @ is an alias to /src

@Options({
  components: {
    SearchBar,
    CharacterList,
  },
})
export default class Home extends Vue {}
</script>
