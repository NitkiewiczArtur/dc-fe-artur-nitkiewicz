import { computed, ref } from "vue";

const ITEMS_PER_PAGE = 20;

export function usePagination(count) {
  const currentPage = ref(1);
  const totalPages = computed(() => Math.ceil(count.value / ITEMS_PER_PAGE));
  const maxVisibleConsecutivePageButtons = computed(() => window.innerWidth > 480 ? 4 : 1);

  return {
    currentPage,
    totalPages,
    maxVisibleConsecutivePageButtons
  };
}
