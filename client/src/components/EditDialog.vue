<template>
  <v-dialog v-model="editItemStore.editDialogOpen">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="editItemStore.editedItem.description" label="Description"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model.number="editItemStore.editedItem.numberPurchased" label="Number Purchased" type="number"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model.number="editItemStore.editedItem.price" label="Price" type="number"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-row class="px-3">
          <v-col>
            <v-btn variant="outlined" block @click="editItemStore.$reset()">Cancel</v-btn>
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
import { useEditItemStore } from '@/stores/editItemStore';

const produceStore = useProduceStore();
const editItemStore = useEditItemStore();

const formTitle = computed(() => {
  return editItemStore.editIndex === -1 ? 'New Item' : 'Edit Item';
});

const saveItem = async () => {
  editItemStore.editIndex === -1
    ? await editItemStore.saveNewPurchase()
    : await editItemStore.saveUpdatedItem();
  produceStore.getPurchases();
  editItemStore.$reset();
};
</script>