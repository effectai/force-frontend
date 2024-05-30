<template>
    <div :style="{
        backgroundColor: cat.color
    }" class="task-category">{{cat.name}}</div>
</template>

<script setup lang="ts">
import { categories } from '~/data/categories';

const props = defineProps<{
    category: string | undefined;
}>();

const cat = computed(() => {
    return categories.find(c => c.name === props.category) ?? { name: 'Unknown', color: 'gray' };
});

</script>

<style>
.task-category{
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    padding: 2px;
    font-weight: bold;
    color: white;
    text-align: center;
    border-radius: 5px;
}
</style>