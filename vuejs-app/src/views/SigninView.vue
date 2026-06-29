<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
})

async function handleSubmit() {
  try {
    await auth.signin(form)
    router.push('/')
  } catch {
    // error shown via store
  }
}
</script>

<template>
  <section class="card">
    <h1>Sign in</h1>
    <form class="form" @submit.prevent="handleSubmit">
      <label>
        Email
        <input v-model="form.email" type="email" required />
      </label>
      <label>
        Password
        <input v-model="form.password" type="password" minlength="6" maxlength="10" required />
      </label>
      <p v-if="auth.error" class="error">{{ auth.error }}</p>
      <button class="button" type="submit" :disabled="auth.loading">
        {{ auth.loading ? 'Signing in...' : 'Sign in' }}
      </button>
    </form>
    <p class="footer-link">
      No account?
      <RouterLink to="/signup">Create one</RouterLink>
    </p>
  </section>
</template>