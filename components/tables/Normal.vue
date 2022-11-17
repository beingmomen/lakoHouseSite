<template>
  <b-row class="justify-content-between">
    <b-col md="2" sm="4" class="my-1">
      <b-form-group class="mb-0">
        <label class="d-inline-block text-sm-left mr-50">{{
          $t("tables.per_page")
        }}</label>
        <b-form-select
          id="perPageSelect"
          v-model="perPage"
          size="sm"
          :options="pageOptions"
          class="w-50"
        />
      </b-form-group>
    </b-col>
    <!-- <b-col md="6" class="my-1">
      <b-form-group
        label="Filter"
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        label-for="filterInput"
        class="mb-0"
      >
        <b-input-group size="sm">
          <b-form-input
            id="filterInput"
            v-model="filter"
            type="search"
            placeholder="Type to Search"
          />
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">
              Clear
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-col> -->

    <b-col cols="12">
      <b-table
        striped
        hover
        responsive
        :per-page="perPage"
        :current-page="currentPage"
        :items="getItems"
        :fields="headers"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        :filter="filter"
        :filter-included-fields="filterOn"
        @filtered="onFiltered"
      >
        <template #cell(avatar)="data">
          <b-avatar :src="data.value" />
        </template>

        <template #cell(status)="data">
          <b-badge :variant="status[1][data.value]">
            {{ status[0][data.value] }}
          </b-badge>
        </template>

        <template #cell(actions)="data">
          <nuxt-link :to="$route.path + '/' + data.item.id">
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
    </b-col>

    <b-col cols="12">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalItems"
        :per-page="perPage"
        align="center"
        size="sm"
        class="my-0"
      />
    </b-col>
  </b-row>
</template>

<script>
import { MoreVerticalIcon, EditIcon, TrashIcon } from "vue-feather-icons";

export default {
  props: {
    headers: Array,
    module: String,
    notId: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      perPage: 25,
      pageOptions: [5, 10, 25, 50],
      totalRows: 1,
      currentPage: 1,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },

      status: [
        {
          1: "Current",
          2: "Professional",
          3: "Rejected",
          4: "Resigned",
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
    getItems() {
      return this.$store.getters[`${this.module}/getAllData`];
    },
    totalItems() {
      return this.$store.getters[`${this.module}/getTotalItems`];
    },
  },
  methods: {
    showMsgBoxTwo(data) {
      console.warn("data :::", data.item.id);
      this.$bvModal
        .msgBoxConfirm(`${this.$t("modals.delete_msg")}( ${data.item.id} )`, {
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
          value
            ? this.$emit("deleteItem", {
                id: data.item.id,
                page: this.currentPage,
              })
            : "";
        });
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
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  components: {
    MoreVerticalIcon,
    EditIcon,
    TrashIcon,
  },
};
</script>
