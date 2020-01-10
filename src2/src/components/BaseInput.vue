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
import { formFieldMixin } from '@/mixins/formFieldMixin.js'
export default {
  //@input="updateValue" calismiyor cunku v-on="$listeners" icinde ustten gelen input event'i onu override ediyor
  //cozum olarak;
  mixins: [formFieldMixin],
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  }
}
</script>

<style scoped></style>
