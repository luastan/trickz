<template>
  <div class="tricks-input">
    <input
      @keyup="$emit('keyup', $event)"
      @keypress="$emit('keypress', $event)"
      @keyup.enter="$emit('keyup.enter', $event)"
      @keydown="$emit('keydown', $event)"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
      :value="value"
      type="text"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    value: {},
  }
}
</script>

<style scoped>

</style>
