<template>
  <ul class="pagination" v-if="totalPages > 1">
    <li class="pagination-item">
      <button
        type="button"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
      >
        &#60;
      </button>
    </li>
    <li
      v-for="page in pages"
      :key="page.name"
      class="pagination-item"
    >
      <button
        type="button"
        @click="page.name === '...'? onClickShowPagesInput(): onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
      >
        {{ page.name }}
      </button>
    </li>
    <li v-if="showPagesInput">
      <input type="number" v-model="manuallySelectedPage">
      <button @click="onClickPage(manuallySelectedPage)">Go to page</button>
    </li>
    <li class="pagination-item">
      <button
        type="button"
        @click="onClickNextPage"
        :disabled="isInLastPage"
      >
        >
      </button>
    </li>
  </ul>
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
      console.log(startPage.value)
      console.log('startPage.value + props.maxVisibleButtons) !== props.totalPages ?' + ((startPage.value + props.maxVisibleButtons) !== props.totalPages) )
      console.log('startPage.value + props.maxVisibleButtons - 1 = ' + (startPage.value + props.maxVisibleButtons - 1))
      console.log(' props.totalPages = ' +  props.totalPages)

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

<style scoped>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4AAE9B;
  color: #ffffff;
}
</style>
