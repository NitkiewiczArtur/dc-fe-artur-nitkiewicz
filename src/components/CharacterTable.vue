<template>
  <div class="container">
    <table class="font-color" style="width: 100vw">
      <thead class="table-header-row">
      <tr>
        <th class="first-empty-header"></th>
        <th>Photo</th>
        <th>Character ID</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Species</th>
        <th>Last Episode</th>
        <th>Add To Favourite</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="character in charactersToDisplay" :key="character.id">
        <td></td>
        <td>
          <img style="height: 68px;" :src="character.image" alt="character img">
        </td>
        <td>{{ character.id }}</td>
        <td>
          {{ character.name }}
        </td>
        <td>
          {{ character.gender }}
        </td>
        <td>
          {{ character.species }}
        </td>
        <td>
          {{ character.episode[character.episode.length - 1].episode }}
        </td>
        <td v-if="isFavourite(character)">
          <button class="favourite-btn favourite-btn--isFavourite"
                  @click="removeFromFavourites(character)">
            <i class="material-icons s" aria-hidden="true">star
            </i>
          </button>
        </td>
        <td v-else>
          <button class="favourite-btn"
                  @click="addToFavourites(character)">
            <i class="material-icons s" aria-hidden="true">star
            </i>
          </button>
        </td>
        <td/>
      </tr>
      </tbody>
    </table>
    <div v-if="showLoadingImage">
      <img class="loading-image" src="../assets/zmiana-programu.jpg" alt="Image of exhausted Morty">
    </div>
    <div style="text-align: end" v-else-if="error">
      {{ error }}
      <img class="error-image" src="../assets/wrong-morty.jpg" alt="Image of confused Morty">
    </div>
  </div>
</template>

<script>
import {useFavourites} from "@/componsable/useFavourites";
import {useStore} from "vuex";

export default {
  name: "CharacterTable",
  props: {
    charactersToDisplay: {
      type: Array,
      required: true
    },
    showLoadingImage: {
      type: Boolean
    },
    error: {
      type: Error
    }
  },
  setup() {
    const store = useStore();
    const {
      isFavourite, addToFavourites, removeFromFavourites
    } = useFavourites(store);
    return {
      isFavourite, addToFavourites, removeFromFavourites
    };
  }
};
</script>

<style scoped lang="scss">

.loading-image {
  width: 60vw;
  margin-left: 20vw;
}

.error-image {
  width: 20vw;
  margin-left: 40vw;
}

.container {
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100%;
  width: 100%;
  padding: 0;

  thead tr {
    height: 3.5rem;
    background-color: rgb(229, 234, 244, 0.25);
    border-bottom: none;
  }

  th {
    width: 10vw;
  }

  tr {
    height: 5.5rem;
    border-bottom: #A9B1BD solid 0.1px;
  }
}

.favourite-btn {
  width: 2.5rem;
  height: 2.5rem;
  background-color: white;
  color: #11B0C8;
  border: #11B0C8 solid 3px;
  border-radius: 5px;
  padding-top: 7px;

  &--isFavourite {
    background-color: #11B0C8;
    border: #11B0C8 solid 3px;
    color: white;
  }
}

.border-bottom {
  border-bottom: #A9B1BD solid 0.25px;
}

.first-empty-header {
  width: 9rem
}

@media screen and (max-width: 590px) {
  thead {
    display: none;
  }
  .container {
    tr {
      display: flex;
      flex-direction: column;
      height: 18rem;
      justify-content: space-between;
      align-items: center;
    }
  }
  .first-empty-header {
    display: none;
  }
}

/*.photo-header{

}
.id-header{

}
.name-header{

}
.gender-header{

}
.species-header{

}
.episode-header{

}
.favourite-header{

}*/
/*@media (max-width: 767px) {
  !* .searchBar {
     left: 80px;
     top: 138px;
   }*!
  .table-wrap table,
  .table-wrap thead,
  .table-wrap tbody,
  .table-wrap th,
  .table-wrap td,
  .table-wrap tr {
    display: block;
  }
  .table-wrap thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  .table-wrap td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 40% !important;
    white-space: normal;
    text-align: left;
  }
  .table-wrap td:before {
    position: absolute;
    top: 0.5rem;
    left: 1rem;
    width: 45%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    font-weight: bold;
  }
  .table-wrap td:first-child {
    padding-top: 1rem;
  }
  .table-wrap td:last-child {
    padding-bottom: 1rem;
  }
  .table-wrap td:first-child:before {
    top: 1rem;
  }
  .table-wrap td:before {
    content: attr(data-title);
  }
  .table tbody tr {
    border-top: 1px solid #ddd;
  }
  .table tbody tr td {
    border: none;
  }
}*/
</style>
