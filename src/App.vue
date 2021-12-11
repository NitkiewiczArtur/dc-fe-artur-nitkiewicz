<template>
  <div id="app">
    <character-list></character-list>
  </div>
</template>

<style lang="scss">
#app {
  color: #A9B1BD;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
}
.blue {
  color: #11B0C8;
}
.blue-background {

}
.table{
  color: #A9B1BD;
}

/*
#11B0C8
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}*/
</style>
<script>
import CharacterList from "@/components/CharacterList";
export default {
  components: { CharacterList }
}
</script>
