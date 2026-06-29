<script setup></script>

<template>
  <div class="app">
    <header class="header">
      <RouterLink class="brand" to="/">ChatSystem</RouterLink>
      <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/signin">Sign in</RouterLink>
        <RouterLink to="/signup">Sign up</RouterLink>
      </nav>
    </header>
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style>
:root {
  color: #1f2937;
  background: #f3f4f6;
  font-family: Inter, system-ui, -apple-system, sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

a {
  color: #2563eb;
  text-decoration: none;
}

.app {
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: #111827;
  color: #f9fafb;
}

.brand {
  color: #f9fafb;
  font-weight: 700;
}

.nav {
  display: flex;
  gap: 1rem;
}

.nav a {
  color: #d1d5db;
}

.nav a.router-link-active {
  color: #ffffff;
}

.main {
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
}

.card {
  width: 100%;
  max-width: 420px;
  padding: 2rem;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(17, 24, 39, 0.08);
}

.card h1 {
  margin-top: 0;
}

.form {
  display: grid;
  gap: 1rem;
}

.form label {
  display: grid;
  gap: 0.35rem;
  font-size: 0.95rem;
}

.form input {
  padding: 0.7rem 0.8rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

.actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1rem;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: #ffffff;
  cursor: pointer;
}

.button.secondary {
  background: #e5e7eb;
  color: #111827;
}

.button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  color: #dc2626;
  margin: 0;
}

.footer-link {
  margin-top: 1rem;
  color: #6b7280;
}
</style>