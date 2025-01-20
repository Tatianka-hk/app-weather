<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-5 rounded-lg text-center shadow-lg">
      <p class="text-gray-800">{{ $t('modals.limit-message') }}</p>
      <button
        class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        @click="$emit('confirm')"
      >
        OK
      </button>
    </div>
  </div>
</template>
