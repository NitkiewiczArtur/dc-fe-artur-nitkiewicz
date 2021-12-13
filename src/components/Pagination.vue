<template>
  <div class="container">
    <ul class="pagination" v-if="totalPages > 1">
      <li class="pagination-item">
        <button
          type="button"
          class="page-btn page-btn--change-page"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
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
        <input style="width: 60px" type="number" v-model="manuallySelectedPage">
        <button style="background-color: #11B0C8" @click="onClickPage(manuallySelectedPage)">Go to page</button>
      </li>
      <li class="pagination-item">
        <button
          type="button"
          class="page-btn page-btn--change-page"
          @click="onClickNextPage"
          :disabled="isInLastPage"
        >
          &#9658;
        </button>
      </li>
    </ul>
  </div>

</template>

<script>
import { computed, ref } from "vue";

export default {
  name: "Pagination",
  props: {
    maxVisibleButtons: {
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
      required: true
    },
  },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props, {emit}) {
    const showPagesInput = ref(false);
    const manuallySelectedPage = ref(null)
    const startPage = computed(() => {
      if (props.currentPage === 1) {
        return 1;
      }
      if (props.currentPage > props.totalPages - props.maxVisibleButtons && props.totalPages > 5) {
        return props.totalPages - props.maxVisibleButtons;
      }
      return props.currentPage - 1;
    });
    const pages = computed(() => {
      const range = [];

      for (let i = startPage.value; i <= (
        (startPage.value + props.maxVisibleButtons) !== props.totalPages ?
          Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages) :
          props.totalPages
      );
           i++
      ) {
        range.push({
          name: i,
          isDisabled: i === props.currentPage
        });
      }

      if (startPage.value < props.totalPages - props.maxVisibleButtons) {
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
    const isInFirstPage = computed(() => {
      return props.currentPage === 1;
    });
    const isInLastPage = computed(() => {
      return props.currentPage === props.totalPages;
    });

    const onClickPreviousPage = () => {
     onClickPage(props.currentPage - 1);
    };
    const onClickNextPage = () => {
      onClickPage( props.currentPage + 1)
    };
    const onClickPage = (page) => {
      showPagesInput.value = false
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
      isInFirstPage,
      isInLastPage,
      onClickPreviousPage,
      onClickNextPage,
      onClickPage,
      onClickShowPagesInput,
      isPageActive,
      manuallySelectedPage
    };
  },
};
</script>

<style scoped lang="scss">
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}
.page-btn {
  margin: 0 8px;
  height: 40px;
  width: 40px;
  border-radius: 5px;
  background-color: white;
  border: solid 2px #A9B1BD;
  color: #A9B1BD;

  &--change-page {
    color: #11B0C8;
  }
}

.active {
  background-color: #11B0C8;
  color: #ffffff;
}
</style>
