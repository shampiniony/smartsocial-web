<template>
  <footer class="bg-secondary text-secondary-foreground py-2">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-between">
        <div class="w-full md:w-1/3 mb-2 md:mb-0 text-left">
          <h2 class="font-medium text-lg mb-1">Команда</h2>
          <div class="grid grid-cols-4 gap-x-1">
            <ul class="list-none">
              <li class="text-sm mb-1">
                <a href="https://t.me/mikedegeofroy" target="_blank" class="no-underline text-secondary-foreground">МИШЕЛЬ</a>
              </li>
              <li class="text-sm mb-1">
                <a href="https://t.me/aliasmityai" target="_blank" class="no-underline text-secondary-foreground">МИТЯ</a>
              </li>
            </ul>
            <ul class="list-none">
              <li class="text-sm mb-1">
                <a href="https://t.me/keine_salz" target="_blank" class="no-underline text-secondary-foreground">САНЯ</a>
              </li>
              <li class="text-sm mb-1">
                <a href="https://t.me/vaniog" target="_blank" class="no-underline text-secondary-foreground">ВАНЯ</a>
              </li>
            </ul>
            <ul class="list-none">
              <li class="text-sm mb-1">
                <a href="https://t.me/evsalik" target="_blank" class="no-underline text-secondary-foreground">ЖЕНЯ</a>
              </li>
              <li class="text-sm mb-1">
                <a href="https://t.me/vktorriaa" target="_blank" class="no-underline text-secondary-foreground">ВИКА</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-full md:w-1/3 mb-2 md:mb-0 text-center">
          <h2 class="font-medium text-lg mb-1">Наши ссылки</h2>
          <div class="flex justify-center space-x-5 mt-3">
            <a href="https://t.me/shampiniony" target="_blank" class="text-secondary-foreground no-underline text-sm">Telegram</a>
            <a href="https://github.com/shampiniony" target="_blank" class="text-secondary-foreground no-underline text-sm">GitHub</a>
          </div>
        </div>
        <div class="w-full md:w-1/3 mb-2 md:mb-0 text-right">
          <p class="text-sm mt-12">
            kolomnago.ru@2024 <br>
          </p>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-400 mt-2">
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
