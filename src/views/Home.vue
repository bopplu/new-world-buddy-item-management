<template>
  <ItemList />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ItemList from '../components/ItemList.vue'
// @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    ItemList,
  },
})
</script>
