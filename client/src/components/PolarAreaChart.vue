<template>
  <PolarAreaChart v-bind="polarAreaChartProps" />
</template>

<script setup lang='ts'>
import { computed } from "vue";
import { PolarAreaChart, usePolarAreaChart } from "vue-chart-3";
import { Chart, ChartData, registerables } from "chart.js";
import { useProduceStore } from "@/stores/produceStore";

Chart.register(...registerables);

const produceStore = useProduceStore();

const chartData = computed<ChartData<"polarArea">>(() => ({
  labels: produceStore.labels,
  datasets: [
    {
      data: produceStore.dollarsSpentPerItem,
      backgroundColor: produceStore.colors,
    },
  ],
}));

const options = computed(() => ({
  scale: {
    ticks: {
      z: 3 as const,
    }
  },
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 50,
      right: 50
    }
  },
  elements: {
    arc: {
      angle: produceStore.angles,
    }
  },
  plugins: {
    legend: {
      display: false
    },
  },
}));

const { polarAreaChartProps } = usePolarAreaChart({
  chartData,
  options,
});
</script>
  