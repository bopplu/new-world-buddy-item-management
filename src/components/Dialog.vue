<template>
  <!--  <teleport to="body">-->
  <div class="fixed z-10" role="dialog" aria-modal="true">
    <div
      class="
        flex
        items-end
        justify-center
        min-h-screen
        pt-4
        px-4
        pb-20
        text-center
        sm:block sm:p-0
      "
    >
      <div
        id="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>
      <span
        id="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      >
        &#8203;
      </span>
      <div id="inline-block align-bottom">
        <h3>Add Item</h3>
        <div>
          <button>
            <p>Save</p>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--  </teleport>-->
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Dialog',
  setup() {
    return {}
  },
})
</script>

<style scoped></style>
