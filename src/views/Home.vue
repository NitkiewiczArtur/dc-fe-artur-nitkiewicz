<template>
  <div class="home">
    <character-list></character-list>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CharacterList from "@/components/CharacterList.vue"; // @ is an alias to /src

@Options({
  components: {
    CharacterList,
  },
})
export default class Home extends Vue {}
</script>
