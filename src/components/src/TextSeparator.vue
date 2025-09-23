<script setup lang="ts">
const props = defineProps<{
  label: string
  end?: boolean
  color?: string
}>()

const twColorMap = {
  red: { text: 'text-red-600', bg: 'bg-red-200' },
  orange: { text: 'text-orange-600', bg: 'bg-orange-200' },
  amber: { text: 'text-amber-600', bg: 'bg-amber-200' },
  yellow: { text: 'text-yellow-600', bg: 'bg-yellow-200' },
  lime: { text: 'text-lime-600', bg: 'bg-lime-200' },
  green: { text: 'text-green-600', bg: 'bg-green-200' },
  emerald: { text: 'text-emerald-600', bg: 'bg-emerald-200' },
  teal: { text: 'text-teal-600', bg: 'bg-teal-200' },
  cyan: { text: 'text-cyan-600', bg: 'bg-cyan-200' },
  sky: { text: 'text-sky-600', bg: 'bg-sky-200' },
  blue: { text: 'text-blue-600', bg: 'bg-blue-200' },
  indigo: { text: 'text-indigo-600', bg: 'bg-indigo-200' },
  violet: { text: 'text-violet-600', bg: 'bg-violet-200' },
  purple: { text: 'text-purple-600', bg: 'bg-purple-200' },
  fuchsia: { text: 'text-fuchsia-600', bg: 'bg-fuchsia-200' },
  pink: { text: 'text-pink-600', bg: 'bg-pink-200' },
  rose: { text: 'text-rose-600', bg: 'bg-rose-200' },
  slate: { text: 'text-slate-600', bg: 'bg-slate-200' },
  gray: { text: 'text-gray-600', bg: 'bg-gray-200' },
  zinc: { text: 'text-zinc-600', bg: 'bg-zinc-200' },
  neutral: { text: 'text-neutral-600', bg: 'bg-neutral-200' },
  stone: { text: 'text-stone-600', bg: 'bg-stone-200' }
}
</script>

<template>
  <div
    class="flex items-center w-full h-3 py-0.5 gap-2"
    :class="props.end ? 'flex-row-reverse' : 'flex-row'"
  >
    <p class="text-xs font-bold uppercase tracking-wide leading-2 bg-white dark:bg-neutral-800"
       :class="twColorMap[color || 'neutral'].text">
      {{ props.label }}
    </p>
    <div
      class="w-full h-full dark:opacity-10"
      :class="[
        props.end ? 'rounded-l' : 'rounded-r',
        twColorMap[color || 'neutral'].bg
      ]"
    />
  </div>
</template>