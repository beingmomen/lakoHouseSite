<template>
  <b-card-code no-body>
    <div v-if="getItems.length">
      <b-card-body>
        <div
          class="d-flex flex-wrap"
          :class="sort ? 'justify-content-between' : 'justify-content-end'"
        >
          <!-- sorting  -->
          <b-row class="w-25">
            <b-col md="12" v-if="sort">
              <b-form-group>
                <v-select
                  v-model="selected1"
                  :dir="dashDir"
                  :reduce="(item) => item.id"
                  :options="statusList"
                  :label="dashDir"
                  :placeholder="$t('inputs.status')"
                >
                </v-select>
              </b-form-group>
            </b-col>
          </b-row>

          <!-- filter -->
          <b-form-group v-if="search" class="mb-0">
            <b-input-group size="md">
              <b-form-input
                class="rounded-end"
                id="filterInput"
                v-model="filter"
                type="search"
                :placeholder="$t('inputs.searchPlaceholder')"
                @input="change"
              />
              <b-input-group-append>
                <b-button
                  class="search-btn-table rounded-end"
                  :disabled="!filter"
                  @click="searchData()"
                >
                  {{ $t("buttons.search") }}
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <b-button
            v-if="create"
            :to="$route.path + '/create'"
            class="ms-4"
            variant="primary"
          >
            <span class="text-nowrap text-capitalize"
              >{{ $t("buttons.add") }} {{ title }}</span
            >
          </b-button>
        </div>
      </b-card-body>

      <b-table
        striped
        hover
        responsive
        class="position-relative"
        :current-page="currentPage"
        :items="getItems"
        :fields="headers"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
      >
        <template #cell(avatar)="data">
          <b-avatar class="avatar-table" :src="data.value" />
        </template>

        <template #cell(cover)="data">
          <b-avatar class="avatar-table" :src="data.value" />
        </template>

        <template #cell(category)="data">
          <nuxt-link
            class="fw-bold"
            :to="
              localePath(
                `/panel/categories/${data.value.name}-${data.value._id}/list`
              )
            "
          >
            {{ data.value.name }}</nuxt-link
          >
        </template>

        <template #cell(images)="data">
          <b-avatar-group size="32px">
            <b-avatar
              v-for="(img, i) in data.value"
              :key="i"
              class="pull-up"
              :src="`${$config.NODE_URL_images}/products/${img}`"
            />
          </b-avatar-group>
        </template>

        <template #cell(status)="data">
          <b-badge
            @click="changeStatus(data)"
            :variant="`light-${resolveClientAvatarVariant(data.item.status)}`"
          >
            {{ data.value | statusFilter(dashDir) }}
          </b-badge>
        </template>

        <template #cell(colors)="data">
          <b-avatar-group size="32px">
            <b-avatar
              v-for="(c, i) in data.value"
              :style="{ backgroundColor: c.color, color: c.color }"
              :key="i"
              class="pull-up"
            />
          </b-avatar-group>
        </template>

        <template #cell(color)="data">
          <div
            class="color-show"
            :style="{ backgroundColor: data.value }"
          ></div>
        </template>

        <template #cell(client)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :src="data.item.avatar"
                :text="avatarText(data.item.name)"
                :variant="`light-${resolveClientAvatarVariant(
                  data.item.status
                )}`"
              />
            </template>
            <div class="ms-3">
              <span class="font-weight-bold d-block text-nowrap">
                {{ data.item.name }}
              </span>
              <small class="">{{ data.item.email }}</small>
              <small class="d-block text-nowrap">{{ data.item.phone }}</small>
            </div>
          </b-media>
        </template>

        <template #cell(actions)="data">
          <nuxt-link
            class="ms-2"
            v-if="show"
            :to="localePath(`${path}/${data.item.slug}-${data.item._id}`)"
          >
            <eye-icon size="1.5x" class="custom-class text-primary"></eye-icon>
          </nuxt-link>
          <nuxt-link
            class="ms-2"
            v-if="update"
            :to="localePath(`${path}/${data.item.slug}-${data.item._id}`)"
          >
            <edit-icon
              size="1.5x"
              class="custom-class text-primary"
            ></edit-icon>
          </nuxt-link>
          <trash-icon
            @click="showMsgBoxTwo(data)"
            size="1.5x"
            class="custom-clas mr-50 text-danger"
          ></trash-icon>
        </template>
      </b-table>

      <b-card-body class="d-flex justify-content-end flex-wrap pt-0">
        <!-- page length -->
        <b-form-group
          v-if="pageLength"
          label="Per Page"
          label-cols="6"
          label-align="left"
          label-size="sm"
          label-for="sortBySelect"
          class="text-nowrap mb-md-0 mr-1"
        >
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            size="sm"
            inline
            :options="pageOptions"
          />
        </b-form-group>

        <!-- pagination -->
        <div v-if="pagination">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalItems"
            :per-page="perPage"
            align="center"
            size="sm"
            class="my-0"
          />
        </div>
      </b-card-body>
    </div>
    <div
      v-else
      class="card align-items-center justify-content-start"
      style="height: calc(100vh - 260px)"
    >
      <lottie-player
        :src="lottie"
        class="lottie-container"
        background="transparent"
        speed="1"
        style="width: 500px; height: 500px"
        loop
        autoplay
      ></lottie-player>
      <b-button
        v-if="create"
        :to="$route.path + '/create'"
        class="ms-4"
        variant="primary"
      >
        <span class="text-nowrap text-capitalize"
          >{{ $t("buttons.add") }} {{ title }}</span
        >
      </b-button>
    </div>

    <b-modal
      id="modal-change-status"
      :title="$t('modals.changeStatus')"
      button-size="sm"
      :ok-title="$t('buttons.change')"
      centered
      :cancel-title="$t('buttons.cancel')"
      cancel-variant="outline-secondary"
      @ok="handleOkToChangeStatus"
    >
      <b-row>
        <FormSelect
          :label="$t('inputs.status')"
          class="mt-1"
          :labelSelect="dashDir"
          storeKey="selectStatus"
          listKey="statusList"
          lg="12"
          md="12"
          global
          :placeHolder="$t('inputs.select')"
          :module="module"
        >
          <template #icon>
            <font-awesome-icon icon="fa-solid fa-signal" />
          </template>
        </FormSelect>
      </b-row>
    </b-modal>
  </b-card-code>
</template>

<script>
import BCardCode from "~/@core/components/b-card-code/BCardCode.vue";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreVerticalIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
} from "vue-feather-icons";
export default {
  props: {
    headers: Array,
    module: String,
    title: String,
    path: String,
    lottie: String,
    items: [Array],
    notId: {
      type: Boolean,
      default: true,
    },
    create: {
      type: Boolean,
      default: true,
    },
    update: {
      type: Boolean,
      default: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    sort: {
      type: Boolean,
      default: false,
    },
    search: {
      type: Boolean,
      default: true,
    },
    pageLength: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    BCardCode,
    ChevronLeftIcon,
    ChevronRightIcon,
    MoreVerticalIcon,
    EditIcon,
    TrashIcon,
    EyeIcon,
  },
  data() {
    return {
      selected1: "",
      perPage: 10,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },

      /* eslint-disable global-require */

      /* eslint-disable global-require */
      status: [
        {
          1: "pending",
          2: "delivered",
          3: "canceled",
          4: "on hold",
          5: "Applied",
        },
        {
          1: "light-primary",
          2: "light-success",
          3: "light-danger",
          4: "light-warning",
          5: "light-info",
        },
      ],
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    },
    statusList() {
      return this.$store.getters[`global/statusList`];
    },
    getItems() {
      return this.$store.getters[`${this.module}/getAllData`];
    },
    totalItems() {
      return this.$store.getters[`${this.module}/getTotalItems`];
    },
  },
  methods: {
    showMsgBoxTwo(data) {
      this.$bvModal
        .msgBoxConfirm(`${this.$t("modals.delete_msg")}( ${data.item.name} )`, {
          title: this.$t("modals.delete_confirm"),
          size: "sm",
          okVariant: "primary",
          okTitle: this.$t("buttons.yes"),
          cancelTitle: this.$t("buttons.no"),
          cancelVariant: "outline-secondary",
          hideHeaderClose: false,
          centered: false,
        })
        .then((value) => {
          if (value) {
            this.$store
              .dispatch(`${this.module}/deleteFromDB`, data.item._id)
              .then((res) => {
                this.$nuxt.refresh();
                this.$toast.success(this.$t("msg.delete"));
              });
          }
        })
        .then(() => {});
    },
    changeStatus(data) {
      this.$bvModal.show("modal-change-status");
      this.$store.commit(`${this.module}/orderId`, data.item._id);
    },
    handleOkToChangeStatus() {
      this.$store.dispatch(`${this.module}/changeStatus`).then((res) => {
        this.$nuxt.refresh();
        this.$toast.success(this.$t("msg.change"));
      });
    },
    avatarText(value) {
      if (!value) return "";
      const nameArray = value.split(" ");
      return nameArray.map((word) => word.charAt(0).toUpperCase()).join("");
    },
    resolveClientAvatarVariant(status) {
      if (status === "pending") return "primary";
      if (status === "canceled") return "danger";
      if (status === "Downloaded") return "secondary";
      if (status === "on hold") return "warning";
      if (status === "Sent") return "info";
      if (status === "delivered") return "success";
      return "primary";
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    searchData() {
      this.$store.dispatch(`${this.module}/getDataByQuery`, {
        page: this.currentPage,
        search: this.filter,
      });
    },
    change() {
      if (!this.filter) {
        this.searchData();
      }
    },
    check() {
      console.warn("this.route", this.$route);
    },
  },
  filters: {
    statusFilter(value, lang) {
      if (lang == "rtl") {
        switch (value) {
          case "pending":
            value = "طلب جديد";
            break;
          case "canceled":
            value = "ملغى";
            break;
          case "on hold":
            value = "فى الإنتظار";
            break;
          case "delivered":
            value = "تم التوصيل";
            break;

          default:
            break;
        }
      }

      return value;
    },
  },
  watch: {
    currentPage(newValue, oldValue) {
      this.$store.dispatch(`${this.module}/getDataByQuery`, {
        page: newValue,
        search: this.filter,
      });
    },
    selected1(newValue) {
      this.$store.dispatch(`${this.module}/getDataByQuery`, {
        page: this.currentPage,
        search: this.filter,
        status: newValue,
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.filterInput {
  margin-top: 5px;
}

.color-show {
  width: 30px;
  height: 30px;
  border-radius: 8px;
}
</style>
