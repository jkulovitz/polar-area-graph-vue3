import { defineStore } from 'pinia';
import purchaseService from '@/services/purchaseService';
import ProduceItem from "@/types/ProduceItem";

export const useProduceStore = defineStore('ProduceStore', {
  state: () => ({
    purchases: [] as ProduceItem[],
    isLoading: false as boolean,
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
    ] as string[],
  }),
  actions: {
    getPurchases () {
      this.isLoading = true;
      return purchaseService.getPurchases().then((data) => {
        this.purchases = Object.values(data);
        this.isLoading = false;
      });
    },
    deletePurchase (item: ProduceItem) {
      return purchaseService.deletePurchase(item.id);
    },
  },
  getters: {
    labels: (state) => state.purchases.map(item => item.description),
    dollarsSpentPerItem: (state) => state.purchases.map(item => item.price),
    totalDollarsSpent() {
      return this.dollarsSpentPerItem.reduce((a, b) => a + b);
    },
    numberOfItemsPurchased: (state) => state.purchases.map(item => item.numberPurchased),
    totalItemsPurchased() {
      return this.numberOfItemsPurchased.reduce((a, b) => a + b);
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
        const newObj = obj;
        newObj.color = this.colors[key];
        newObj.numberPurchasedPercent = this.numberOfItemsPurchased[key] / this.totalItemsPurchased * 100;
        newObj.dollarsPercentPercent = this.dollarsSpentPerItem[key] / this.totalDollarsSpent * 100;
        return newObj;
      });
      return metrics;
    }
  },
});
