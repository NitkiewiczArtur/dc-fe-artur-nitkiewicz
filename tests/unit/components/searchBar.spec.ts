import { mount } from "@vue/test-utils";
import SwitchField from "@/components/SwitchField.vue";
import SearchBar from "@/components/SearchBar.vue";

let wrapper

describe("SearchBar.vue", () => {
  beforeEach(() => {
    wrapper = mount(SearchBar, {
      props: {
        searchKeys:["TestKey1", "TestKey2"]
      }
    });
  });

  it("renders correctly", () => {
    const inputs = wrapper.findAll("input");
    const xd = 2
    /*const labels = wrapper.findAll("label");
    expect(inputs.length).toBe(TEST_VALUES.length);
    expect(labels.length).toBe(TEST_VALUES.length);
    inputs.forEach(input => {
      expect(getInputType(input)).toBe("radio");*/
    });
  });
  it("should switch and emit 'fieldSwitched' event on field switch", async () => {
    const firstButton = wrapper.find(`#${TEST_VALUES[0]}`);
    const secondButton = wrapper.find(`#${TEST_VALUES[1]}`);

    await secondButton.setChecked(true);
    expect(secondButton.element.checked).toBeTruthy()
    expect(firstButton.element.checked).toBeFalsy()
    expect(wrapper.emitted().fieldSwitched).toBeTruthy()

    await firstButton.setChecked(true);
    expect(firstButton.element.checked).toBeTruthy()
    expect(secondButton.element.checked).toBeFalsy()
    expect(wrapper.emitted().fieldSwitched.length).toBe(2)
  });
});
