<template>
  <div class="z-50 left-0">
    <div :class="{ 'w-96 pl-[24px] pr-[24px]': isOpen, 'w-20 items-center': !isOpen }"
      class="min-h-screen h-full bg-secondary z-50 transition-all duration-200 ease-in-out flex flex-col relative">
      <div class="mt-2 space-y-8">
        <button @click="$emit('toggle-sidebar')"
          class="p-2 rounded-3xl bg-gray-200 absolute left-0 top-14 transform -translate-x-1/2">
          <img class="w-6 h-6 rounded-3xl" :class="{ 'rotate-180': !isOpen }" src="@/assets/icons/double-arrow.svg" />
        </button>

        <div v-if="isOpen" class="flex flex-col items-center gap-y-6">
          <Input v-model="title" placeholder="Название мероприятия" />

          <Input min="0" type="number" v-model="duration" placeholder="Длительность мероприятия" />

          <Textarea v-model="description" placeholder="Описание мероприятия" />

          <TagsInput class="w-full" v-model="ticketNumbers">
            <TagsInputItem v-for="item in ticketNumbers" :key="item" :value="item">
              <TagsInputItemText />
              <TagsInputItemDelete />
            </TagsInputItem>

            <TagsInputInput placeholder="Номера билетов" />
          </TagsInput>

          <NumberField class="w-full" id="minCapacity" :default-value="minCapacity" :min="0">
            <Label for="minCapacity">Максимальное количество человек</Label>
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>

          <NumberField class="w-full" id="maxCapacity" :default-value="maxCapacity" :min="0">
            <Label for="maxCapacity">Минимальное количество человек</Label>
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>

          <Popover v-model:open="open">
            <PopoverTrigger as-child>
              <Button variant="outline" role="combobox" :aria-expanded="open" class="w-full justify-between">
                {{ value
                  ? frameworks.find((framework) => framework.value === value)?.label
                  : "Select framework..." }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-80 p-0">
              <Command>
                <CommandInput class="h-9" placeholder="Search framework..." />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    <CommandItem v-for="framework in frameworks" :key="framework.id" :value="framework.value"
                      @select="(ev) => {

                        if (typeof ev.detail.value === 'string') {
                          value = ev.detail.value

                          placeId = framework.id;
                          console.log(placeId); 
                        }
                        open = false
                      }">
                      {{ framework.label }}
                      <Check :class="cn(
                        'ml-auto h-4 w-4',
                        value === framework.value ? 'opacity-100' : 'opacity-0',
                      )" />
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Button class="w-full" @click="saveChangesHandler">Сохранить</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import { Label } from '@/components/ui/label'
import { addEvent } from '@/api/event.api'
import { computed, onMounted, ref } from 'vue'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { cn } from '@/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

let frameworks: {
  id: number;
  value: string;
  label: string;
}[] = []

onMounted(async () => {
  await getPlaces(new Date());
  // places.all
  frameworks = places.all.map(el => ({
    id: el.id,
    value: el.name,
    label: el.name
  }))
})

// const frameworks = [
//   { value: 'next.js', label: 'Next.js' },
//   { value: 'sveltekit', label: 'SvelteKit' },
//   { value: 'nuxt', label: 'Nuxt' },
//   { value: 'remix', label: 'Remix' },
//   { value: 'astro', label: 'Astro' },
// ]

const open = ref(false)
const value = ref('')

// import { ComboboxAnchor, ComboboxInput, ComboboxPortal, ComboboxRoot } from 'radix-vue'
// import { CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@/components/ui/tags-input'
import getPlaces from '@/api/places.api'
import { places } from '@/store/places.store'


defineProps<{
  isOpen: boolean
}>()

const title = ref<string>('')
const description = ref<string>('')
const duration = ref<string>('');
const minCapacity = ref<number>(1);
const maxCapacity = ref<number>(90);
// const placeId = ref<number | null>(null); 
let placeId: number | null = null;

const saveChangesHandler = async () => {
  await addEvent({
    place: placeId!,
    name: title.value,
    description: description.value,
    duration_minutes: duration.value as unknown as number,
    icalendar_data: `BEGIN:VCALENDAR
CALSCALE:GREGORIAN
PRODID:-//Apple Inc.//macOS 14.5//EN
VERSION:2.0
X-APPLE-CALENDAR-COLOR:#CC73E1
X-WR-CALNAME:Test
BEGIN:VTIMEZONE
TZID:Europe/Moscow
BEGIN:STANDARD
TZNAME:GMT+3
TZOFFSETFROM:+023017
TZOFFSETTO:+023017
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
CREATED:20240615T061134Z
DTEND:20240614T084500
DTSTAMP:20240615T061215Z
DTSTART:20240614T064500
LAST-MODIFIED:20240615T061148Z
RRULE:FREQ=DAILY;COUNT=1
SEQUENCE:1
SUMMARY:Event 1
TRANSP:OPAQUE
UID:7F367739-2CD1-490F-84A4-E8B8C35756B5
X-APPLE-CREATOR-IDENTITY:com.apple.calendar
X-APPLE-CREATOR-TEAM-IDENTITY:0000000000
END:VEVENT
BEGIN:VEVENT
CREATED:20240615T061137Z
DTEND:20240610T133000
DTSTAMP:20240615T061215Z
DTSTART:20240610T113000
LAST-MODIFIED:20240615T061154Z
RRULE:FREQ=DAILY;COUNT=1
SEQUENCE:1
SUMMARY:Event 1
TRANSP:OPAQUE
UID:4F7D3667-2CDF-45AF-8B8B-DEC6BCA72DC2
X-APPLE-CREATOR-IDENTITY:com.apple.calendar
X-APPLE-CREATOR-TEAM-IDENTITY:0000000000
END:VEVENT
BEGIN:VEVENT
CREATED:20240615T061138Z
DTEND:20240610T160000
DTSTAMP:20240615T061215Z
DTSTART:20240610T140000
LAST-MODIFIED:20240615T061158Z
RRULE:FREQ=DAILY;COUNT=1
SEQUENCE:1
SUMMARY:Event 1
TRANSP:OPAQUE
UID:FE1CBA27-33D7-4ED5-821C-A96FDEAA258D
X-APPLE-CREATOR-IDENTITY:com.apple.calendar
X-APPLE-CREATOR-TEAM-IDENTITY:0000000000
END:VEVENT
BEGIN:VEVENT
CREATED:20240615T061139Z
DTEND:20240610T183000
DTSTAMP:20240615T061215Z
DTSTART:20240610T163000
LAST-MODIFIED:20240615T061204Z
RRULE:FREQ=DAILY;COUNT=1
SEQUENCE:1
SUMMARY:Event 1
TRANSP:OPAQUE
UID:B4FE949A-857F-4EEF-A63F-58B0FB466384
X-APPLE-CREATOR-IDENTITY:com.apple.calendar
X-APPLE-CREATOR-TEAM-IDENTITY:0000000000
END:VEVENT
END:VCALENDAR
`,
    min_capacity: minCapacity.value,
    max_capacity: maxCapacity.value,
    tickets: ticketNumbers.value as unknown as number[]
  });
}

// const frameworks = [
//   { value: 'next.js', label: 'Next.js' },
//   { value: 'sveltekit', label: 'SvelteKit' },
//   { value: 'nuxt', label: 'Nuxt' },
//   { value: 'remix', label: 'Remix' },
//   { value: 'astro', label: 'Astro' },
// ]

const ticketNumbers = ref<string[]>([])
// const open = ref(false)
// const searchTerm = ref('')

// const filteredFrameworks = computed(() => frameworks.filter(i => !modelValue.value.includes(i.label)))
</script>


<!-- <script setup lang="ts">
import { computed, ref } from 'vue'
import { ComboboxAnchor, ComboboxInput, ComboboxPortal, ComboboxRoot } from 'radix-vue'
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@/components/ui/tags-input'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

const modelValue = ref<string[]>([])
const open = ref(false)
const searchTerm = ref('')

const filteredFrameworks = computed(() => frameworks.filter(i => !modelValue.value.includes(i.label)))
</script>

<!-- <template>

</template> -->