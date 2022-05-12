<template>
<!-- TODO FIX this to actually edit quali's -->
 <section class="section">
   <div class="container">
    <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
        <li>
          <nuxt-link to="/qualifications">
            All Qualifications
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="`/qualifications/${id}`" aria-current="page">
          Qualification {{ id }}
          </nuxt-link>
        </li>
        <li class="is-active">
          <nuxt-link to="#">
            Edit
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <div v-if="qualificationLoading" class="loading-text">
      Qualification Loading
    </div>
    <div v-else-if="!qualification">
      Could not retrieve qualification
    </div>
    <h1 class="title mt-5">
      Edit Qualification
    </h1>
    <form @submit.prevent="createQualification">
      <div class="block basic-info-group">

        <div class="field">
          <label class="label">
            Name
            <span class="has-text-info">*</span>
          </label>
          <div class="control">
            <input v-model="qualificationIpfs.name" type="text" class="input" placeholder="Public name for your qualification" required>
          </div>
        </div>

        <div class="field">
          <label class="label">
            Description
            <span class="has-text-info">*</span>
          </label>
          <div class="control">
            <vue-simplemde
            v-model="qualificationIpfs.description"
            :configs="{promptUrls: true, status: false, spellChecker: false, placeholder: 'Public description for your qualification'}" />
            <!-- <textarea class="textarea" rows="5" placeholder="Qualification Description"></textarea> -->
          </div>
        </div>

        <div class="field">
          <label class="label">
            Image
            <span class="has-text-info">*</span>
          </label>
          <div class="control">
            <input v-model="qualificationIpfs.image" type="text" class="input" placeholder="Image Url" required>
          </div>
        </div>

        <div class="field">
          <label class="label">
            Qualification Type
            <span class="has-text-info">*</span>
          </label>
          <div class="select is-medium">
            <select v-model="qualificationIpfs.type" class="select" required>
              <option :value="selectNull" selected="selectType">{{ selectType }}</option>
              <option value="0">Required</option>
              <option value="1">Exclude</option>
            </select>
          </div>
        </div>

        <div class="field is-grouped is-grouped-right">
          <div class="control">
            <nuxt-link class="button is-light" to="/">Cancel</nuxt-link>
          </div>
          <!-- TODO add disabled property when all input fields have not been filled in yet. -->
          <div class="control">
            <button class="button is-primary is-wide" type="submit" :class="{ 'is-loading' : loading }" >
              Create Qualification
            </button>
          </div>
        </div>
      </div>
    </form>
    <success-modal v-if="successMessage" :message="successMessage" :title="successTitle" />
   </div>
 </section>
</template>

<script>
import VueSimplemde from 'vue-simplemde'
import SuccessModal from '~/components/SuccessModal.vue'

export default {
  components: {
    VueSimplemde,
    SuccessModal
  },
  middleware: ['auth'],
  data () {
    return {
      qualificationLoading: false,
      qualification: null,
      successMessage: null,
      successTitle: null

    }
  }
}
</script>

<style>

</style>
