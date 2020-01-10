<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <!-- eslint-disable-next-line prettier/prettier -->
    <input
      :value="value"
      @input="updateValue"
      v-bind="$attrs"
      v-on="listeners"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    value: [String, Number]
  },
  //@input="updateValue" calismiyor cunku v-on="$listeners" icinde ustten gelen input event'i onu override ediyor
  //cozum olarak;
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped></style>
