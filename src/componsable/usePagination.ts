import { computed, Ref, ref } from "vue";

const ITEMS_PER_PAGE = 20;

export function usePagination(count: Ref<number>) {
  const currentPage: Ref<number> = ref(1);
  const totalPages: Ref<number> = computed(() => Math.ceil(count.value / ITEMS_PER_PAGE));
  const maxVisibleConsecutivePageButtons: Ref<number> = computed(() => window.innerWidth > 480 ? 4 : 1);

  return {
    currentPage,
    totalPages,
    maxVisibleConsecutivePageButtons
  };
}
