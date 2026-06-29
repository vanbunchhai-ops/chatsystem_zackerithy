<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

async function handleSubmit() {
  try {
    await auth.signup(form)
    router.push('/signin')
  } catch {
    // error shown via store
  }
}
</script>

<template>
  <section class="card">
    <h1>Sign up</h1>
    <form class="form" @submit.prevent="handleSubmit">
      <label>
        Name
        <input v-model="form.name" type="text" maxlength="100" required />
      </label>
      <label>
        Email
        <input v-model="form.email" type="email" required />
      </label>
      <label>
        Password
        <input v-model="form.password" type="password" minlength="6" maxlength="10" required />
      </label>
      <label>
        Confirm password
        <input
          v-model="form.password_confirmation"
          type="password"
          minlength="6"
          maxlength="10"
          required
        />
      </label>
      <p v-if="auth.error" class="error">{{ auth.error }}</p>
      <button class="button" type="submit" :disabled="auth.loading">
        {{ auth.loading ? 'Creating account...' : 'Sign up' }}
      </button>
    </form>
    <p class="footer-link">
      Already have an account?
      <RouterLink to="/signin">Sign in</RouterLink>
    </p>
  </section>
</template>