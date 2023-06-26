<template>
    <div class="q-pa-md q-gutter-md">
      <q-inner-loading :showing="Loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </div>
  </template>

<script>
export default {
  name: 'MyInput',
  props: {
    Loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
