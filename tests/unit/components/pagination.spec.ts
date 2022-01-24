import { mount } from "@vue/test-utils";
import Pagination from "@/components/Pagination.vue";

function findGotoPageButton(button: any): boolean {
  return button.text() === "...";
}

function findPreviousPageButton(button: any): boolean {
  return button.text() === "◄";
}

function findNextPageButton(button: any): boolean {
  return button.text() === "►";
}

function getPageToGoArgumentFromPageChangedEvents(wrapper: any, eventNumber: number): number {
  return wrapper.emitted().pagechanged[eventNumber][0];
}

function setCurrentPage(pageNumber:number){
  wrapper.setProps({ currentPage: pageNumber })
}

let wrapper: any;

describe("Pagination.vue", () => {
  beforeEach(() => {
    wrapper = mount(Pagination, {
      props: {
        maxVisibleConsecutivePageButtons: 4,
        totalPages: 20,
        currentPage: 1
      }
    });
  });

  describe("Rendering", () =>{
    it("should render 1 extra buttons when there is 1 more total page than maxVisibleConsecutivePageButtons prop value",
      async () => {
        await wrapper.setProps({ maxVisibleConsecutivePageButtons: 4, totalPages: 5 });
        const totalExpectedAmountOfPageButtons = wrapper.props().maxVisibleConsecutivePageButtons + 1;
        const selectPageButtons = wrapper.findAll(".page-btn--number");

        expect(selectPageButtons.length).toBe(totalExpectedAmountOfPageButtons);
      });

    it("should render 2 extra buttons (goToPage and lastPage btns) when there is >= 2 total pages than " +
      "maxVisibleConsecutivePageButtons prop value", () => {
      const totalExpectedAmountOfPageButtons = wrapper.props().maxVisibleConsecutivePageButtons + 2;
      const totalPagesProp = wrapper.props().totalPages.toString();
      const selectPageButtons = wrapper.findAll(".page-btn--number");

      expect(selectPageButtons.length).toBe(totalExpectedAmountOfPageButtons);
      expect(selectPageButtons.find(findGotoPageButton)).toBeDefined();
      expect(selectPageButtons[totalExpectedAmountOfPageButtons - 1].text()).toBe(totalPagesProp);
    });

    it("should render 2 navigation buttons when there is more than one total pages", () => {
      const selectPageButtons = wrapper.findAll(".page-btn--change-page");

      expect(selectPageButtons.length).toBe(2);
    });
  });

  it("should disable previous page btn when on first page", async () => {
    const previousPageButton = wrapper.findAll(".page-btn--change-page")
      .find(findPreviousPageButton);

    expect(previousPageButton.element.disabled).toBe(true);
  });

  it("should disable next page btn when on last page", async () => {
    await wrapper.setProps({ totalPages: 10, currentPage: 10 });
    const nextPageButton = wrapper.findAll(".page-btn--change-page")
      .find(findNextPageButton);

    expect(nextPageButton.element.disabled).toBe(true);
  });

  it("should emit pagechanged events with incremented/decremented page as argument " +
    "after clicking next and previous page buttons",
    async () => {
      const nextPageButton = wrapper.findAll(".page-btn--change-page")
        .find(findNextPageButton);
      const previousPageButton = wrapper.findAll(".page-btn--change-page")
        .find(findPreviousPageButton);
      const nextPage = wrapper.props().currentPage + 1;
      const previousPage = nextPage - 1;

      await nextPageButton.trigger("click");

      expect(getPageToGoArgumentFromPageChangedEvents(wrapper, 0)).toBe(nextPage);

      await setCurrentPage(nextPage);
      await previousPageButton.trigger("click");

      expect(getPageToGoArgumentFromPageChangedEvents(wrapper, 1)).toBe(previousPage);
    });

  it("should emit pagechanged event with selected page as an argument after page select", async () => {
    const pageButtonToClick = wrapper.findAll(".page-btn--number")[2];
    const selectedButtonPageNumber = Number(pageButtonToClick.text())

    await pageButtonToClick.trigger('click');

    expect(getPageToGoArgumentFromPageChangedEvents(wrapper, 0)).toBe(selectedButtonPageNumber)
  });

  it("should emit pagechanged event with selected page as an argument after direct page select", async () => {
    const directGotoPageButton = wrapper.findAll(".page-btn").find(findGotoPageButton)
    await directGotoPageButton.trigger('click');
    const goToPageInput = wrapper.find('.go-to-page-input')
    const goToPageButton = wrapper.find('.go-to-page-btn')

    await goToPageInput.setValue('6')
    await goToPageButton.trigger('click')

    expect(getPageToGoArgumentFromPageChangedEvents(wrapper, 0)).toBe(6)
  });
});
