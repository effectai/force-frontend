<template>
  <div class="control">
    <div class="file has-name is-fullwidth">
      <label class="file-label">
        <input id="file" ref="file" class="file-input" type="file" @change="getSelectedFile">
        <span class="file-cta">
          <span class="file-icon">
            <i class="fa fa-upload" />
          </span>
          <span class="file-label">
            Choose a file…
          </span>
        </span>
        <span class="file-name">
          <span v-if="selectedFile">{{ selectedFile.name }}</span>
        </span>
        <span>
          <button :class="{'is-loading': uploadingFile}" :disabled="!selectedFile" class="button is-primary" @click.prevent="uploadFile">Upload to IPFS</button>
        </span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      uploadingFile: false,
      selectedFile: null,
      file: null,
      ipfsExplorer: this.$blockchain.sdk.config.ipfsNode
    }
  },
  methods: {
    getSelectedFile () {
      if (this.$refs.file) {
        this.selectedFile = this.$refs.file.files[0]
      }
    },
    async uploadFile () {
      if (this.selectedFile) {
        this.uploadingFile = true
        const formData = new FormData()
        formData.append('file', this.selectedFile)
        try {
          if (this.selectedFile.size > 1000000) {
            this.selectedFile = null
            this.$refs.file.value = ''
            throw new Error('Max file size allowed is 1 MB')
          } else {
            const response = await fetch(`${this.ipfsExplorer}/api/v0/add?pin=true`,
              {
                method: 'POST',
                body: formData
              })
            this.file = await response.json()
            this.$emit('upload', `${this.ipfsExplorer}/${this.file.Hash}`)
            this.selectedFile = null
            this.$refs.file.value = ''
          }
        } catch (e) {
          this.$blockchain.handleError(e)
        }
        this.uploadingFile = false
      }
    }
  }
}
</script>
