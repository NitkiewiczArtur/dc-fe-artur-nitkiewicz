import { mount } from "@vue/test-utils";
import CharacterSearch from "@/components/CharacterSearch.vue";
import SearchBar from "@/components/SearchBar.vue";
import SwitchField from "@/components/SwitchField.vue";
import Pagination from "@/components/Pagination.vue";

let wrapper: any;
//let mountFunction: (options?: object) => Wrapper<Vue>

function setCurrentPage(pageNumber: number) {
  wrapper.setProps({ currentPage: pageNumber });
}

describe("CharacterSearch.vue", () => {
  beforeEach(() => {
    wrapper = mount(CharacterSearch);
  });

  describe("Rendering", () => {
    it("should render all its items: logo, searchBar, switchField, table, pagination", () => {

      const logo = wrapper.find(".logo");
      const searchBar = wrapper.findComponent(SearchBar);
      const switchField = wrapper.findComponent(SwitchField);
      const table = wrapper.find("table");
      const pagination = wrapper.findComponent(Pagination);

      expect(logo.exists()).toBeTruthy();
      expect(searchBar.exists()).toBeTruthy();
      expect(switchField.exists()).toBeTruthy();
      expect(table.exists()).toBeTruthy();
      expect(pagination.exists()).toBeTruthy();
    });
  });

  //TODO: switch changes list of characters
  //TODO: changing page works
  //TODO: adding to favourites works

  it("", () =>{
    wrapper
  })

});
