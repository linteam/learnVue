<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <!-- v-on="$listeners sayesinde cagrildigi yere eklenen event'leri alabilecek. -->
    <select
      :value="value"
      @change="updateValue"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <option
        v-for="option in options"
        :value="option"
        :key="option.id"
        :selected="option === value"
        >{{ option }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  /*Class ve style attribute'lari icin props kullanilir.
    inheritAttrs: false bunlar icin ise yaramaz
    Vue3 ile degisebilir.*/
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      required: true
    },
    value: [String, Number],
    label: String
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped></style>
