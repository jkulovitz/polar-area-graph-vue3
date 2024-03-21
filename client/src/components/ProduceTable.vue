<template>
  <v-data-table
    :items="produceStore.tableMetrics"
    :headers="headers"
    density="compact"
    class="text-left polar-area-table"
  >
  <template v-slot:[`item.description`]="{ item }">
    <v-avatar :color="item.color" size="12" tile></v-avatar>
    {{item.description}}
  </template>
  <template v-slot:[`item.numberPurchasedPercent`]="{ item }">
    {{Math.round(item.numberPurchasedPercent)}}%
  </template>
  <template v-slot:[`item.dollarsPercentPercent`]="{ item }">
    {{Math.round(item.dollarsPercentPercent)}}%
  </template>
  <template v-slot:[`item.actions`]="{ item }">
    <v-icon :icon="'mdi-pencil'" size="small" class="mr-2" @click="editPurchaseInTable(item)"></v-icon>
    <v-icon :icon="'mdi-delete'" size="small" @click="deletePurchaseFromTable(item)"></v-icon>
  </template>
  <template #bottom>
    <v-row>
      <v-col cols="auto">
        <v-btn variant="outlined" small class="mt-5" @click="addPurchase()">Add New Purchase</v-btn>
      </v-col>
      <v-col>
        <v-data-table-footer
          items-per-page-text="$vuetify.dataTable.itemsPerPageText"
          class="modified-footer"
        ></v-data-table-footer>
      </v-col>
    </v-row>
  </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { useProduceStore } from "@/stores/produceStore";
import { useEditItemStore } from "@/stores/editItemStore";
import ProduceItem from '@/types/ProduceItem';

const produceStore = useProduceStore();
const editItemStore = useEditItemStore();

const headers = [
  { title: 'Description', key: 'description' },
  { title: 'Number Purchased', key: 'numberPurchased' },
  { title: 'Number Purchased %', key: 'numberPurchasedPercent' },
  { title: 'Total Price', key: 'price' },
  { title: 'Total Price %', key: 'dollarsPercentPercent' },
  { title: 'Actions', key: 'actions', sortable: false },
];

const editPurchaseInTable = (item: ProduceItem) => {
  editItemStore.editIndex = produceStore.purchases.indexOf(item);
  editItemStore.editPurchase(item);
  editItemStore.editDialogOpen = true;
};
const deletePurchaseFromTable = async (item: ProduceItem) => {
  await produceStore.deletePurchase(item);
  produceStore.getPurchases();
};
const addPurchase = () => {
  editItemStore.editIndex = -1;
  editItemStore.editDialogOpen = true;
};
</script>

<style>
.polar-area-table {
  width: 60%;
  margin: 15px auto;
}
</style>
