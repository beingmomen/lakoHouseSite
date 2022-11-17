<template>
  <div class="content-wrapper">
    <CardsBreadcrumb :title="title" :breadcrumbs="breadcrumbs" />
    <div class="content-body">
      <b-row>
        <slot name="content"></slot>
      </b-row>
    </div>
  </div>
</template>

<script>
import { HomeIcon } from "vue-feather-icons";
export default {
  props: {
    title: String,
    breadcrumbs: Array,
  },
  components: {
    HomeIcon,
  },
};
</script>

<style lang="scss" scoped>
</style>
