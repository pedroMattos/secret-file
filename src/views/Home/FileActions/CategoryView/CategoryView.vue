<script setup>
import {defineProps, computed} from 'vue'
const props = defineProps({
  category: { type: String, default: null }
})

function getIconColor (category) {
  if(category === 'normal') return 'green'

}
const iconColor = computed(() => {
  return getIconColor(props.category)
})
</script>
<template>
  <div class="lock">
    <v-btn icon variant="text">
      <s-icon icon-name="square" :icon-color="iconColor" />
    </v-btn>
  </div>
</template>

<style lang="scss" scoped></style>
