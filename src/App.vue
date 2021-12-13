<template>
  <div class="app">
    <character-list></character-list>
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
import CharacterList from "@/components/CharacterList";
export default {
  components: { CharacterList }
}
</script>
