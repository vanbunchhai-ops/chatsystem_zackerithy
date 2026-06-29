<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

onMounted(async () => {
  if (auth.token) {
    const valid = await auth.verifySession()
    if (!valid) {
      router.push('/signin')
    }
  }
})

async function handleSignout() {
  await auth.signout()
  router.push('/signin')
}
</script>

<template>
  <section class="card">
    <h1>ChatSystem</h1>
    <p v-if="auth.isAuthenticated">Welcome, {{ auth.user?.name }}.</p>
    <p v-else>You are not signed in.</p>

    <div class="actions">
      <RouterLink v-if="!auth.isAuthenticated" class="button" to="/signin">Sign in</RouterLink>
      <RouterLink v-if="!auth.isAuthenticated" class="button secondary" to="/signup">Sign up</RouterLink>
      <button v-if="auth.isAuthenticated" class="button" type="button" @click="handleSignout">
        Sign out
      </button>
    </div>
  </section>
</template>