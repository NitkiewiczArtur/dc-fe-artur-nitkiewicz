<template>
  <div class="switch-field">
    <input type="radio" :id="firstValue" v-model="selectedValue" :value="firstValue" checked />
    <label :for="firstValue">{{ firstValue }}</label>
    <template v-for="value in restOfValues" :key="value">
      <input type="radio" :id="value" v-model="selectedValue" :value="value" />
      <label :for="value">{{ value }}</label>
    </template>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";

export default {
  name: "SwitchField",
  props: {
    values: {
      required: true
    }
  },
  setup(props, { emit }) {
    const selectedValue = ref(null);
    const firstValue = computed(()=> props.values[0])
    const restOfValues = computed(() => {
      const copyOfValues = [...props.values]
      copyOfValues.shift()
      return copyOfValues;
    });
    watch(selectedValue, (selectedValue) => emit("fieldSwitched", selectedValue));
    return {
      firstValue,
      restOfValues,
      selectedValue
    };
  }
};
</script>

<style scoped>
.switch-field {
  display: flex;
  margin-bottom: 2rem;
  overflow: hidden;
}
.switch-field input {
  position: absolute !important;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  width: 1px;
  border: 0;
  overflow: hidden;
}

.switch-field label {
  color: #A9B1BD;
  font-size: 14px;
  line-height: 1;
  text-align: center;
  margin: 8px 16px;
  transition: all 0.1s ease-in-out;
}

.switch-field label:hover {
  cursor: pointer;
}

.switch-field input:checked + label {
  color: #11B0C8;
  border-bottom: #11B0C8 solid 2px;
}
@media screen and (min-width: 880px) {
  .switch-field {
    margin: 0 0 2rem 5.8rem;
  }
  .switch-field label {
    padding: 0.5rem 0;
    margin-right: 5rem;
  }
}
</style>
