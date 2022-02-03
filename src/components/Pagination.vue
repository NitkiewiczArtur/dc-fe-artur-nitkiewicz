<template>
  <div class="container">
    <ul class="pagination" v-if="totalPages > 1">
      <li class="pagination-item">
        <button
            type="button"
            class="page-btn page-btn--change-page"
            @click="onClickPreviousPage"
            :disabled="isOnFirstPage"
        >
          &#9668;
        </button>
      </li>
      <li
          v-for="page in pages"
          :key="page.name"
          class="pagination-item"
      >
        <button
            type="button"
            class="page-btn page-btn--number"
            @click="page.name === '...'? onClickShowPagesInput(): onClickPage(page.name)"
            :disabled="page.isDisabled"
            :class="{ active: isPageActive(page.name) }"
        >
          {{ page.name }}
        </button>
      </li>
      <li v-if="showPagesInput">
        <input class="go-to-page-input" type="number" v-model="manuallySelectedPage">
        <button class="go-to-page-btn" @click="onClickPage(manuallySelectedPage)">Go to page</button>
      </li>
      <li class="pagination-item">
        <button
            type="button"
            class="page-btn page-btn--change-page"
            @click="onClickNextPage"
            :disabled="isOnLastPage"
        >
          &#9658;
        </button>
      </li>
    </ul>
  </div>

</template>

<script>
import {computed, ref} from "vue";

export default {
  name: "Pagination",
  props: {
    maxVisibleConsecutivePageButtons: {
      type: Number,
      required: false,
      default: 4
    },
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true,
      default: 1
    },
  },
  setup(props, {emit}) {
    const showPagesInput = ref(false);
    const manuallySelectedPage = ref(null)
    const startPage = computed(() => {
      if (props.currentPage === 1) {
        return 1;
      }
      if (props.currentPage > props.totalPages - props.maxVisibleConsecutivePageButtons && props.totalPages > 5) {
        return props.totalPages - props.maxVisibleConsecutivePageButtons;
      }
      return props.currentPage - 1;
    });
    const pages = computed(() => {
      const range = [];

      for (let i = startPage.value; i <= (
          (startPage.value + props.maxVisibleConsecutivePageButtons) !== props.totalPages ?
              Math.min(startPage.value + props.maxVisibleConsecutivePageButtons - 1, props.totalPages) :
              props.totalPages
      );
           i++
      ) {
        range.push({
          name: i,
          isDisabled: i === props.currentPage
        });
      }

      if (startPage.value < props.totalPages - props.maxVisibleConsecutivePageButtons) {
        range.push({
          name: "...",
          isDisabled: false
        });
        range.push({
          name: props.totalPages,
          isDisabled: false
        });
      }
      return range;
    });
    const isOnFirstPage = computed(() => {
      return props.currentPage === 1;
    });
    const isOnLastPage = computed(() => {
      return props.currentPage === props.totalPages;
    });

    const onClickPreviousPage = () => {
      onClickPage(props.currentPage - 1);
    };
    const onClickNextPage = () => {
      onClickPage(props.currentPage + 1);
    };
    const onClickPage = (page) => {
      showPagesInput.value = false;
      emit("pagechanged", page);
    };
    const onClickShowPagesInput = () => {
      showPagesInput.value = !showPagesInput.value;
    };
    const isPageActive = (page) => {
      return props.currentPage === page;
    };
    return {
      pages,
      showPagesInput,
      isOnFirstPage,
      isOnLastPage,
      manuallySelectedPage,
      onClickPreviousPage,
      onClickNextPage,
      onClickPage,
      onClickShowPagesInput,
      isPageActive
    };
  },
};
</script>

<style scoped lang="scss">
.container {
  margin: 2.5rem 0 0 3rem;
}

.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.page-btn {
  margin: 0 0.5rem;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 5px;
  background-color: white;
  border: solid 2px #A9B1BD;
  color: #A9B1BD;

  &--change-page {
    color: #11B0C8;
  }
}

.go-to-page-input {
  width: 3.75rem
}

.go-to-page-btn {
  background-color: #11B0C8
}

.active {
  background-color: #11B0C8;
  color: #ffffff;
}

@media screen and (min-width: 880px) {
  .container {
    margin-left: 8rem;
  }
}
</style>
