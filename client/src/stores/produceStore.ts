import { defineStore } from 'pinia';
import purchaseService from '@/services/purchaseService';
import ProduceData from "@/types/ProduceData";

export const useProduceStore = defineStore('ProduceStore', {
  state: () => ({
    purchases: [] as ProduceData[],
    isLoading: false,
    colors: [
        "#b3045d",
        "#e4b847",
        "#9fd041",
        "#72bf76",
        "#6d9fe4",
        '#381d8e',
        '#6e0081',
        '#7a5000',
        '#404040',
    ],
    editDialogOpen: false,
    editIndex: -1,
    defaultItem: {
        description: '',
        numberPurchased: 0,
        price: 0,
    },
    editedItem: {
        description: '',
        numberPurchased: 0,
        price: 0,
    },
  }),
  actions: {
    getPurchases () {
      this.isLoading = true;
      return purchaseService.getPurchases().then((data) => {
        this.purchases = Object.values(data);
        this.isLoading = false;
      })
    },
    deletePurchase (item) {
      return purchaseService.deletePurchase(item.id)
    },
    editPurchase (item) {
      this.editedItem = {...item};
    },
    closeDialog () {
      this.editDialogOpen = false;
      this.editedItem = this.defaultItem;
      this.editIndex = -1;
    },
    saveUpdatedItem () {
      const forApiObj = this.editedItem;
      delete forApiObj.color;
      delete forApiObj.dollarsPercentPercent;
      delete forApiObj.numberPurchasedPercent;
      return purchaseService.editPurchase(forApiObj.id, forApiObj)
    },
    saveNewPurchase () {
      return purchaseService.saveNewPurchase(this.editedItem)
    },
  },
  getters: {
    labels: (state) => {
      return state.purchases.map(item => item.description)
    },
    dollarsSpentPerItem: (state) => {
      return state.purchases.map(item => item.price)
    },
    totalDollarsSpent() {
      return this.dollarsSpentPerItem.reduce((a, b) => a + b)
    },
    numberOfItemsPurchased: (state) => {
      return state.purchases.map(item => item.numberPurchased)
    },
    totalItemsPurchased() {
      return this.numberOfItemsPurchased.reduce((a, b) => a + b)
    },
    angles() {
      return this.numberOfItemsPurchased.map((value) => {
        const percent = value / this.totalItemsPurchased;
        const percentOfTurn = 360 * percent;
        return percentOfTurn;
      });
    },
    tableMetrics() {
      const metrics = this.purchases.map((obj, key) => {
        const newObj = obj
        newObj.color = this.colors[key]
        newObj.numberPurchasedPercent = this.numberOfItemsPurchased[key] / this.totalItemsPurchased * 100
        newObj.dollarsPercentPercent = this.dollarsSpentPerItem[key] / this.totalDollarsSpent * 100
        return newObj
      })
      return metrics
    }
  },
});
