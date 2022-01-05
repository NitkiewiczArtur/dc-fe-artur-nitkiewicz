<template>
  <div class="searchBar">
    <div class="searchBar__item searchBar__item--title">
      <p>Search by</p>
    </div>
    <div class="ddwn-menu">
      <div class="selected-key" v-text="selectedSearchKey">
      </div>
      <ul>
        <template v-for="searchKey in searchKeys" :key="searchKey">
        <li @click="selectSearchKey(searchKey)">{{searchKey}}</li>
        </template>
      </ul>
    </div>
    <div class="searchBar__item searchBar__item--input-container">
      <input class="searchBar__item__input" type="search" v-model="searchValue" />
      <i class="material-icons s blue searchBar__item__text" @click="onSearchFromStart" aria-hidden="true">search</i>
    </div>

  </div>
</template>

<style scoped lang="scss">
.ddwn-menu {
  position: relative;
display: flex;
  flex-direction: column;
  flex: auto;
  padding: 15px;
  border-right: solid 2px #A9B1BD;
  min-width: 71px
}
ul{
  margin: 0;
  display: none;
  position: absolute;
  top: 58px;
  left: -2px;
  transition-delay: 2s;
  padding: 15px 15px 0 15px;
  border-right: solid 2px #A9B1BD;
  border-left: solid 2px #A9B1BD;
  border-bottom: solid 2px #A9B1BD;
  background-color: white;
}
ul li {
  list-style: none;
  text-align: left;
  display: flex;
  justify-content: space-between;
  min-height: 50px;
}
ul:hover{
  display: flex;
}
.ddwn-menu:hover ul {
  display: block;
}
.searchBar {
  max-width: 300px;
  list-style: none;
  display: flex;
  padding: 0;
  border-radius: 10px;
  border: solid 2px #A9B1BD;
  box-sizing: unset;

  min-width: 220px;

  &__item {
    padding-left: 20px;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    border-right: solid 2px #A9B1BD;
    height: 56px;
    min-width: 80px;

    &:hover {
      color: #A9B1BD;
    }

    & p {
      margin: 0;
    }

    &--title {
      display: none;
    }

    &--input-container {
      flex-direction: row;
      justify-content: space-between;
    }

    &--dropdown {
      width: 100px;
      padding-left: 20px;
    }

    &__input {
      width: 30vw;
      min-width: 90px;
      outline: none;
      border: none;
    }

    &__text {
      padding-top: 15px;
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

    &:hover .dropdown-list {
      border: solid 2px #A9B1BD;
    }
  }
}

.input {
  width: 15vw;
}

.dropdown-list {
  position: relative;
  top: 100px;
  left: -20px;
  flex-direction: column;
  width: 128px;
  padding-left: 20px;
  background-color: white;

  &__item {
    display: none;
  }

  &:hover {
    border: solid 2px #A9B1BD;
  }
}

@media screen and (min-width: 810px) {
  .searchBar {
    max-width: 400px;

    &__item {
      &--title {
        display: flex;
        min-width: 100px;
        justify-content: center;
      }
    }
  }
  *, ::after, ::before {
    box-sizing: content-box;
  }
  .input{
    width: 140px;
  }
  }
</style>

<script>
import { ref } from "vue";

export default {
  name: "SearchBar",
  props: {
    searchKeys: {
      type: Array,
      required: true
    },
  },
  setup(props, {emit}){
    const selectedSearchKey = ref(props.searchKeys[0])
    const searchValue = ref('')
    const selectSearchKey = (key) => {
      selectedSearchKey.value = key
    }
    const onSearchFromStart = () => {
      emit('searchClicked', selectedSearchKey, searchValue)
    }
    return{
      selectedSearchKey,
      searchValue,
      selectSearchKey,
      onSearchFromStart
    }
  }
};
</script>
