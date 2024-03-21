<template>
  <v-dialog v-model="produceStore.editDialogOpen">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="produceStore.editedItem.description" label="Description"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model.number="produceStore.editedItem.numberPurchased" label="Number Purchased" type="number"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model.number="produceStore.editedItem.price" label="Price" type="number"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-row class="px-3">
          <v-col>
            <v-btn variant="outlined" block @click="produceStore.closeDialog">Cancel</v-btn>
          </v-col>
          <v-col>
            <v-btn variant="flat" block color="primary" @click="saveItem">Save</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useProduceStore } from "@/stores/produceStore";

const produceStore = useProduceStore();

const formTitle = computed(() => {
  return produceStore.editIndex === -1 ? 'New Item' : 'Edit Item';
});

const saveItem = async () => {
  produceStore.editIndex === -1
    ? await produceStore.saveNewPurchase()
    : await produceStore.saveUpdatedItem();
  produceStore.getPurchases();
  produceStore.closeDialog();
};
</script>