<template>
  <div class="container relative mx-auto text-gray-100">
    <table class="w-full p-4 border-2 border-white">
      <thead class="font-bold">
        <tr class="leading-relaxed">
          <th class="text-left px-4">
            <span>Name</span>
            <input
              type="search"
              class="mx-6 px-3 w-72 rounded-xl bg-transparent"
              v-model="itemFilter"
              placeholder="Search..."
            />
          </th>
          <th>Category</th>
          <th>Tier</th>
          <th>
            <button
              class="rounded bg-green-400 my-2 px-2 py-1"
              @click="showDialog = true"
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
            <button class="rounded bg-blue-400 my-1" @click="onEdit(item)">
              <span class="px-2">Edit</span>
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
  <Dialog v-if="showDialog" :item="currentItem" @closeModal="onDialogClose" />
</template>

<script setup lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { deleteItem, Item, useLoadItems } from '@/firebase'
import Dialog from '@/components/Dialog.vue'
import Dots from '@/assets/dots.svg'

const itemFilter = ref<string | null>(null)
const _items = useLoadItems()
const items = computed(() =>
  _items.value.filter(
    (item) =>
      !itemFilter.value ||
      item.name.toLowerCase().includes(itemFilter.value.toLowerCase())
  )
)

const showDialog = ref<boolean>(false)
const dropDownOpen = ref(false)
const dropDownIndex = ref(-1)
const currentItem = ref<Item | null>(null)

const toggleDropdown = (index: number) => {
  dropDownOpen.value = !dropDownOpen.value
  dropDownIndex.value = index
}

const delItem = (id: string) => {
  deleteItem(id)
  dropDownOpen.value = false
}

function onEdit(item: Item) {
  currentItem.value = item
  showDialog.value = true
}

function onDialogClose() {
  showDialog.value = false
  currentItem.value = null
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
