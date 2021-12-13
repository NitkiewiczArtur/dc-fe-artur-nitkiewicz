<template>
  <div class="searchBarContainer">
    <ul class="searchBar">
      <li class="searchBar__item searchBar__item--title">
        <p>Search by</p>
      </li>
      <li class="searchBar__item searchBar__item--dropdown"><p v-text="selectedSearchKey" />
        <ul class="dropdown-list">
          <template v-for="searchKey in searchKeys" :key="searchKey">
            <li class="dropdown-list__item">
              <p @click="selectSearchKey(searchKey)">{{searchKey}}</p>
            </li>
          </template>
        </ul>
      </li>
      <li class="searchBar__item">
        <div>
          <input type="search" v-model="searchValue" />
          <span class="searchBar__text" @click="onSearchFromStart">
        <i class="material-icons s blue" aria-hidden="true">search</i>
        </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SearchBar",
  props: {
    searchKeys:[],
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
  width: 505px;
  height: 56px;
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
      width: 200px;
      outline: none;
      border: none;
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
@media (max-width: 767px) {
  .searchBar {
    left: 80px;
    top: 138px;
  }
}
</style>
