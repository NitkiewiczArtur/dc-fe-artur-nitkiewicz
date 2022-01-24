import { mount } from "@vue/test-utils";
import CharacterSearch from "@/components/CharacterSearch.vue";
import SearchBar from "@/components/SearchBar.vue";
import SwitchField from "@/components/SwitchField.vue";
import Pagination from "@/components/Pagination.vue";
import CharacterTable from "@/components/CharacterTable.vue";
import { getTestCharacterList } from "../../utils/rickAndMortyApiTestUtils";
import { createStore } from "vuex";
import characterModule from "@/store/modules/character";

let wrapper: any;

function setCurrentPage(pageNumber: number) {
  wrapper.setProps({ currentPage: pageNumber });
}

const mountFunction = (options = {}) => {
  return mount(CharacterSearch, {
    ...options
  });
};

describe("CharacterSearch.vue", () => {
  let actions;
  let state;
  let store;
  beforeEach(() => {

    /*  const characterList = getTestCharacterList(20);
      const favouriteCharacterList = getTestCharacterList(5)

      store.commit("characterModule/setCharacters", characterList);
      store.commit("characterModule/setCount", characterList.length);
      store.commit("characterModule/setFavouriteCharacters", favouriteCharacterList)*/
    state = {
      favouriteCharacters: getTestCharacterList(5),
      charactersFromEpisodePaginated: [],
      characters: getTestCharacterList(20),
      count: 20
    };
    store = createStore({
      modules: {
        characterModule: {
          state: state,
          actions: characterModule.actions,
          getters: characterModule.getters,
          mutations: characterModule.mutations,
          namespaced: true
        }
      }
    });
    wrapper = mount(CharacterSearch, {
      global: {
        plugins: [store]
      }
    });
  });

  describe("Rendering", () => {
    it("should render all its items: logo, searchBar, switchField, table, pagination", () => {

      const logo = wrapper.find(".logo");
      const searchBar = wrapper.findComponent(SearchBar);
      const switchField = wrapper.findComponent(SwitchField);
      const table = wrapper.findComponent(CharacterTable);
      const pagination = wrapper.findComponent(Pagination);

      expect(logo.exists()).toBeTruthy();
      expect(searchBar.exists()).toBeTruthy();
      expect(switchField.exists()).toBeTruthy();
      expect(table.exists()).toBeTruthy();
      expect(pagination.exists()).toBeTruthy();
    });
  });
});
