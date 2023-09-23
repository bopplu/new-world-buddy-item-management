<template>
  <button @click="router.push('/')">Back</button>
  <p>Logging In</p>
</template>

<script setup>
import { defineComponent } from 'vue'
import { isLoggedIn, signIn } from '@/firebase.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

isLoggedIn().then((loggedIn) => {
  if (!loggedIn) {
    signIn()
  } else {
    router.push('/')
  }
})
</script>

<style scoped></style>
