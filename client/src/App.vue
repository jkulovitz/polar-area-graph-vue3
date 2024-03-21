<template>
  <v-progress-circular v-if="isLoading" indeterminate></v-progress-circular>
  <div v-else>
    <PolarAreaChart />
    <ProduceTable />
  </div>
  <EditDialog />
</template>

<script setup>
import { onMounted } from 'vue';
import PolarAreaChart from '@/components/PolarAreaChart.vue';
import ProduceTable from '@/components/ProduceTable.vue';
import EditDialog from '@/components/EditDialog.vue';
import { useProduceStore } from '@/stores/produceStore';

const isLoading = useProduceStore().isLoading;

onMounted(async () => {
  useProduceStore().getPurchases();
})
</script>


