<template>
  <div class="textarea">
    <div class="flex">
      <textarea 
        :placeholder="placeholder" 
        class="block w-full p-2 rounded-none border-t"
        :style="computedStyles"
        @focus="resize"
        v-model="currentValue"
        :disabled="disabled"
        @keyup.enter.exact="sendMessage($event)"
      ></textarea>
      <div class="flex">
        <button class="bg-blue-700 px-2 text-white" type="button" @click="sendMessage">Send</button>
      </div>
    </div>
    <textarea class="shadow" v-model="currentValue" ref="shadow" tabindex="0"></textarea>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    autosize: {
      type: Boolean,
      default: true
    },
    minHeight: {
      type: [Number],
      default: null
    },
    maxHeight: {
      type: [Number],
      default: null
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // data property for v-model binding with real textarea tag
      currentValue: null,
      // works when content height becomes more then value of the maxHeight property
      maxHeightScroll: false,
      inputHeight: 0
    }
  },
  computed: {
    computedStyles () {
      if (!this.autosize) return {}
      return {
        'min-height': this.inputHeight
      }
    },
  },
   watch: {
    currentValue () {
      this.$nextTick(this.resize)
    },
    minHeight () {
      this.$nextTick(this.resize)
    },
    maxHeight () {
      this.$nextTick(this.resize)
    },
    autosize (val) {
      if (val) this.resize()
    }
  },
  mounted(){
    this.resize()
  },
  methods: {
    resize(){
      let contentHeight = this.$refs.shadow.scrollHeight
      if (this.minHeight) {
        contentHeight = contentHeight < this.minHeight ? this.minHeight : contentHeight
      }
      if (this.maxHeight) {
        if (contentHeight > this.maxHeight) {
          contentHeight = this.maxHeight
          this.maxHeightScroll = true
        } else {
          this.maxHeightScroll = false
        }
      }
      this.inputHeight = `${contentHeight}px`
      return this
    },
    sendMessage(){
      this.$emit("sendMessage", this.currentValue)
    }
  }
}
</script>

<style scoped lang="scss">
.textarea {
  position: relative;

  textarea {
    position: relative;
    z-index: 100;
    resize: none;
    overflow: auto;
    font-size: 16px;
    height: 0;

    &.shadow {
      max-height: 0;
      pointer-events: none;
      opacity: 0;
      margin: 0;
      padding:0;
      position: absolute;
      left: 0;
      top:0;
    }
  }
}
</style>