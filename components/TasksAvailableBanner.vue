<template>
<div class="tasks-available-banner">
    <p>You have 5 new tasks available!</p>
    <button class="button">View tasks</button>
</div>
</template>

<script setup lang="ts">
</script>

<style scoped>
p{
    margin: 0;
    font-weight:bold;
    color:black;
}

.tasks-available-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background: url('/img/preview-bg.png');
    background-color: #f0f0f0;
    border-radius: 10px;
}
</style>