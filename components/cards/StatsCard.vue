<template>
  <b-col lg="3" sm="6">
    <nuxt-link :to="localePath(route)">
      <b-card no-body>
        <b-card-body class="d-flex justify-content-between align-items-center">
          <div class="truncate">
            <h2 class="mb-25 font-weight-bolder">{{ value }}</h2>
            <span class="text-uppercase">
              {{ dashDir == "rtl" ? arName : enName }}
            </span>
          </div>
          <b-avatar variant="light-primary" size="45">
            <slot name="icon"></slot>
          </b-avatar>
        </b-card-body>
      </b-card>
    </nuxt-link>
  </b-col>
</template>

<script>
export default {
  props: ["route", "value", "arName", "enName"],
};
</script>

<style lang="scss" scoped>
.do {
  cursor: pointer;
}
</style>