<template>
  <div class="container relative mx-auto text-gray-100">
    <table class="w-full p-4 border-2 border-white">
      <thead class="font-bold">
        <tr class="leading-relaxed">
          <th class="text-left px-4">Name</th>
          <th>Category</th>
          <th>Tier</th>
          <th>
            <button
              class="rounded bg-green-400 my-2 px-2 py-1"
              @click="showNewItem = true"
            >
              <p>New Item</p>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="item.id"
          class="leading-loose border-t-2"
        >
          <td class="text-left px-4">
            <span v-show="false">{{ item.id }}</span
            >{{ item.name }}
          </td>
          <td>{{ item.category }}</td>
          <td>{{ item.tier }}</td>
          <td class="flex flex-row items-center">
            <button class="rounded bg-blue-400 my-1">
              <p class="px-2">Edit</p>
            </button>
            <div class="pt-2">
              <button class="">
                <img
                  :src="Dots"
                  alt="Dots"
                  height="20"
                  width="20"
                  @click="toggleDropdown(index)"
                />
              </button>
              <div
                :id="'dropdown_' + index"
                v-show="dropDownOpen && dropDownIndex === index"
                class="p-2 bg-gray-700"
              >
                <ul>
                  <li @click="delItem(item.id)">Delete</li>
                </ul>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Dialog v-if="showNewItem" @closeModal="showNewItem = false" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { deleteItem, useLoadItems } from '@/firebase'
import Dialog from '@/components/Dialog.vue'
import Dots from '@/assets/dots.svg'

export default defineComponent({
  name: 'Item List',
  components: { Dialog },
  setup() {
    const items = useLoadItems()
    const showNewItem = ref<boolean>(false)
    const dropDownOpen = ref(false)
    const dropDownIndex = ref(-1)

    const toggleDropdown = (index: number) => {
      dropDownOpen.value = !dropDownOpen.value
      dropDownIndex.value = index
    }

    const delItem = (id: string) => {
      deleteItem(id)
      dropDownOpen.value = false
    }

    return {
      items,
      showNewItem,
      Dots,
      dropDownOpen,
      dropDownIndex,
      toggleDropdown,
      delItem,
    }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
