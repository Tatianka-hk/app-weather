<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
  >
    <div class="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
      <p class="text-gray-800">{{ $t('modals.delete-message') }}</p>
      <div class="flex gap-4 mt-4">
        <button
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          @click="$emit('confirm')"
        >
          {{ $t('modals.confirm') }}
        </button>
        <button
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          @click="$emit('cancel')"
        >
          {{ $t('modals.cancel') }}
        </button>
      </div>
    </div>
  </div>
</template>
