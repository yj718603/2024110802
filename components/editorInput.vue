<template>
  <div id="translator-app-editor-input" v-html="innerText" @input="changeText" @focus="isLocked = true"
       @blur="isLocked = false" class="dzm-textarea"
       placeholder="请输入要翻译的内容" contenteditable="true"></div>
</template>
<script>
  export default {
    name: 'editorInput',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        innerText: this.value,
        isLocked: false
      }
    },
    methods: {
      changeText(e) {
        this.$emit('input', this.$el.innerHTML);
      }
    },
    watch: {
      value() {
        if (!this.isLocked || !this.innerText) {
          this.innerText = this.value;
        }
      }
    }
  }
</script>
<style type="text/css">
  /* 输入框 */
  .dzm-textarea {
    padding: 30px 20px 70px 20px;
    border: 1px solid #D9D9D9;
    min-height: 300px;;
    resize: vertical;
    overflow: auto;
    border-radius: 4px;
  }

  .dzm-textarea[contenteditable] {
    outline: 0px solid #D9D9D9;
    border: 1px solid #D9D9D9;
    width: 100%;
  }

  .dzm-textarea[contenteditable]:focus {
    border: 1px solid #D9D9D9;
    border-radius: 3px;
  }

  /* 输入框为空时显示 placeholder */
  .dzm-textarea:empty:before {
    content: attr(placeholder);
    color: #999999;
  }

  /* 输入框获取焦点时移除 placeholder */
  .dzm-textarea:focus:before {
    content: none;
  }
</style>
