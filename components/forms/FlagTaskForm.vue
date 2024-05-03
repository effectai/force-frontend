<template>
    <div>
    <form class="flag-form">
        <div>
            <input type="radio" id="option_1" value="faulty" v-model="reason" />
            <label for="faulty">Unable to submit</label>
        </div>
        <div>
            <input type="radio" id="option_2" value="spam" v-model="reason" />
            <label for="spam">Spam</label>
        </div>
        <div>
            <input type="radio" id="option_3" value="inappropriate" v-model="reason" />
            <label for="inappropriate">Inappropriate</label>
        </div>
        <div>
            <input type="radio" id="option_4" value="other" v-model="reason" />
            <label for="other">Other:</label>
            <input type="text" v-model="customReason" placeholder="Please provide the reason." v-if="reason === 'other'" />
        </div>
    </form>

    <div class="button-container">
    <input type="button" class="button" value="Submit" @click="handleSubmit" /></div>
</div>
</template>

<script setup lang="ts">
const reason = ref(null);
const customReason = ref(null);

const emit = defineEmits<(e: "flag", data: string) => void>();

const handleSubmit = () => {
	emit("flag", reason.value === "other" ? customReason.value : reason.value);
};
</script>

<style scoped>

.button-container {
    display: flex;
    justify-content: flex-end;
}

.flag-form {
    display: flex;
    flex-direction: column;
    min-width: 450px;
}

.flag-form input[type="radio"] {
    display: flex;
    width: 20px;
    margin: 5px;
}

.flag-form label {
    display: flex;
    margin: 5px;
}

.flag-form div {
    display: flex;
    align-items: center;
    margin: 5px;
}
</style>