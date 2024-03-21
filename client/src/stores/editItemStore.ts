import { defineStore } from 'pinia';
import purchaseService from '@/services/purchaseService';

export const useEditItemStore = defineStore('EditItemStore', {
  state: () => ({
    editedItem: {
      description: '',
      numberPurchased: 0,
      price: 0,
    },
    editDialogOpen: false as boolean,
    editIndex: -1 as number,
  }),
  actions: {
    editPurchase (item) {
      this.editedItem = {...item};
    },
    saveUpdatedItem () {
      const forApiObj = this.editedItem;
      delete forApiObj.color;
      delete forApiObj.dollarsPercentPercent;
      delete forApiObj.numberPurchasedPercent;
      return purchaseService.editPurchase(forApiObj.id, forApiObj);
    },
    saveNewPurchase () {
      return purchaseService.saveNewPurchase(this.editedItem);
    },
  },
});
