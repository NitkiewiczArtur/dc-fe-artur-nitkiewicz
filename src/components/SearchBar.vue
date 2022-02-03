<template>
  <div class="searchBar">
    <div class="searchBar__item searchBar__item--title">
      <p>Search by</p>
    </div>
    <div class="ddwn-menu">
      <div class="selected-key" v-text="selectedSearchKey" />
      <ul>
        <template v-for="searchKey in searchKeys" :key="searchKey">
        <li @click="selectSearchKey(searchKey)">{{searchKey}}</li>
        </template>
      </ul>
    </div>
    <div class="searchBar__item searchBar__item--input-container">
      <input class="searchBar__item__input" type="search"
             v-model="searchValue"
             @keyup.enter="onSearchFromStart" />
      <i class="material-icons s blue searchBar__item__icon"
         aria-hidden="true"
         @click="onSearchFromStart">search</i>
    </div>
  </div>
</template>

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

<style scoped lang="scss">
.ddwn-menu {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: auto;
  padding: 1rem;
  border-right: solid 2px #A9B1BD;
  max-width: 6.125rem;
  min-width: 6.125rem;
  width: 6.125rem;
}
.selected-key{
  min-width: 6.125rem;
  width: 6.125rem;
}
ul {
  margin: 0;
  display: none;
  position: absolute;
  top: 3.63rem;
  left: -2px;
  transition-delay: 2s;
  padding: 0;
  border-right: solid 2px #A9B1BD;
  border-left: solid 2px #A9B1BD;
  border-bottom: solid 2px #A9B1BD;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: white;
}

ul li {
  list-style: none;
  text-align: left;
  display: flex;
  justify-content: space-between;
  height: 2.5rem;
  max-height: 2.5rem;
  width: 6.125rem;
  padding: 1rem 1rem 0 1rem;
  border-bottom: solid 2px #A9B1BD;
}
li:last-child {
  border-bottom: none;
}

ul:hover {
  display: flex;
}

.ddwn-menu:hover ul {
  display: block;
  cursor: pointer;
}

.searchBar {
  list-style: none;
  display: flex;
  padding: 0;
  border-radius: 10px;
  border: solid 2px #A9B1BD;
  box-sizing: unset;
  cursor: default;

  &__item {
    padding-left: 20px;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    border-right: solid 2px #A9B1BD;
    height: 3.5rem;

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

    &__input {
      outline: none;
      border: none;
      color: #A9B1BD;
      max-width: 7.5rem;
    }

    &__icon {
      padding: 1rem 1.25rem 0 0;
      font-size: 2rem;
      cursor: pointer;
      color: #11B0C8;
    }

    &:last-child {
      border-right: none;
    }
  }
}
@media screen and (min-width: 932px) {
  .searchBar {
    max-width: 31.5rem;
    &__item {
      &--title {
        display: flex;
        width: 6.5rem;
        min-width: 6.5rem;
        justify-content: center;
      }
      &__input {
        max-width: 11.25rem;
      }
    }
  }
  *, ::after, ::before {
    box-sizing: content-box;
  }
  .input{

  }
}
</style>
