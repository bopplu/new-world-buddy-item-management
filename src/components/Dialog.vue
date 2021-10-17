<template>
  <teleport to="body">
    <div
      class="
        absolute
        top-20
        bottom-20
        left-36
        right-36
        bg-nord2
        flex flex-col
        mx-auto
        z-10
      "
    >
      <div class="p-4 bg-gray-700">
        <form>
          <div class="mb-4 px-10">
            <label for="name" class="block text-gray-200 mb-3"> Name </label>
            <input
              id="name"
              ref="firstField"
              placeholder="Name"
              v-model="name"
              type="text"
              class="
                shadow
                appearance-none
                border
                rounded
                w-full
                leading-10
                px-4
              "
            />
          </div>
          <div class="mb-4 px-10">
            <label for="tier" class="block text-gray-200 mb-3"> Tier </label>
            <input
              id="tier"
              placeholder="Tier"
              v-model="tier"
              type="text"
              class="
                shadow
                appearance-none
                border
                rounded
                w-full
                leading-10
                px-4
              "
            />
          </div>
          <div class="mb-4 px-10">
            <label for="category" class="block text-gray-200 mb-3">
              Category
            </label>
            <input
              id="category"
              placeholder="Category"
              v-model="category"
              type="text"
              class="
                shadow
                appearance-none
                border
                rounded
                w-full
                leading-10
                px-4
              "
            />
          </div>
          <div class="mb-4 px-10">
            <div class="flex">
              <label class="block text-gray-200 mb-3"> Ingredients </label>
              <button
                type="button"
                class="rounded bg-green-500 ml-2 px-6 py-1 text-white"
                @click="pushRow"
              >
                <p>+</p>
              </button>
            </div>
            <div class="flex flex-row flex-wrap">
              <div v-for="(row, index) in ingredients" :key="index">
                <input
                  :id="'name_' + index"
                  :name="'name_' + index"
                  placeholder="Name"
                  type="text"
                  :value="row.name"
                  @input="updateIngredientName($event.target.value, index)"
                  class="
                    shadow
                    appearance-none
                    border
                    rounded
                    w-96
                    leading-10
                    px-4
                    mr-4
                  "
                />
                <input
                  :id="'category_' + index"
                  :name="'category_' + index"
                  placeholder="Quantity"
                  type="text"
                  :value="row.quantity"
                  @input="updateIngredientQuantity($event.target.value, index)"
                  @keypress.enter="saveItem"
                  class="
                    shadow
                    appearance-none
                    border
                    rounded
                    w-96
                    leading-10
                    px-4
                  "
                />
              </div>
            </div>
          </div>
          <div class="flex flex-row justify-end">
            <button
              class="bg-green-600 text-white px-4 py-1 text-white text-lg"
              type="button"
              @click="saveItem"
            >
              <p>Save</p>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div
      class="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-70"
      @click="$emit('closeModal')"
    ></div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { addItem, Item } from '@/firebase'

export default defineComponent({
  name: 'Dialog',
  emits: ['closeModal'],
  setup() {
    const template = { name: '', quantity: '' }
    const initial = () => ({
      name: '',
      tier: '',
      category: '',
      ingredients: [{ ...template }],
    })
    const state = reactive(initial())
    const firstField = ref<HTMLInputElement | null>(null)

    const pushRow = () => state.ingredients.push({ ...template })

    const updateIngredientName = (value: string, index: number) =>
      (state.ingredients[index].name = value)

    const updateIngredientQuantity = (value: string, index: number) =>
      (state.ingredients[index].quantity = value)

    const saveItem = () => {
      const item: Item = {
        name: state.name.trim(),
        tier: parseInt(state.tier),
        category: state.category.trim(),
        ingredients: state.ingredients
          .filter((i) => i.name && i.quantity)
          .map((i) => ({ ...i, quantity: parseInt(i.quantity) })),
      }
      Object.assign(state, { ...initial() })
      firstField.value?.focus()
      addItem(item)
    }

    return {
      ...toRefs(state),
      pushRow,
      saveItem,
      updateIngredientName,
      updateIngredientQuantity,
      firstField,
    }
  },
})
</script>

<style scoped></style>
