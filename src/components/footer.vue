<template>
  <footer class="bg-secondary text-secondary-foreground py-8 mt-10">
    <div class="border-t border-gray-400 py-5">
      <p class="text-center text-sm py-1">&copy; Shampiniony 2024</p>
    </div>
  </footer>
</template>

<style scoped>
.container {
  max-width: 1400px;
}
.list-none {
  padding: 0;
  margin: 0;
}
.text-sm {
  line-height: 1.1;
}
.no-underline {
  text-decoration: none;
}
.text-secondary-foreground {
  color: var(--secondary-foreground);
}
.border-t {
  border-top: 1.5px solid;
}
.border-gray-400 {
  border-color: #d1d5db;
}
.grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.gap-x-1 {
  column-gap: 0.25rem;
}
</style>
