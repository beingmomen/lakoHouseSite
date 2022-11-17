<template>
  <div class="content-body">
    <div class="misc-wrapper">
      <div class="misc-inner p-2 p-sm-3">
        <div
          class="
            w-100
            text-center
            d-flex
            flex-column
            justify-content-center
            align-items-center
          "
        >
          <h2 class="mb-1">{{ $t("cards.notAuthorized") }} 🔐</h2>
          <p class="mb-2">
            {{ $t("cards.notPermission") }}
          </p>
          <b-button
            variant="primary"
            class="mb-1 btn-sm-block"
            :to="localePath('/login')"
          >
            {{ $t("buttons.goLogin") }}
          </b-button>
          <b-img
            v-if="dashboardMode"
            fluid
            :src="require(`@/assets/images/pages/not-authorized.svg`)"
            alt="Not authorized page"
          />
          <b-img
            v-else
            fluid
            :src="require(`@/assets/images/pages/not-authorized-dark.svg`)"
            alt="Not authorized page"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>
