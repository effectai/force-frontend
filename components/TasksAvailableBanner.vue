<template>
<div class="tasks-available-banner">
    <p>You have {{ totalTasksAvailable }} new tasks available!</p>
</div>
</template>

<script setup lang="ts">
    const {useCampaigns} = useEffectClient();

    const { totalTasksAvailable, data: campaigns } = useCampaigns({
        calculateAvailableTasks: true
    });

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