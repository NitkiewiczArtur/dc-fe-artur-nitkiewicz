<template>
  <div class="app">
    <character-search></character-search>
  </div>
</template>

<style lang="scss">
.app {
  color: #A9B1BD;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
}

.font-color{
  color: #A9B1BD;
}
</style>
<script>
import CharacterSearch from "@/components/CharacterSearch";
export default {
  components: { CharacterSearch }
}
</script>
