<template>
  <div class="editor-item">
    <div :id="editorId" class="editor-block" v-if="content"></div>
    <div v-else>Sorry，没有匹配到代码，有问题，请告知<a target="_blank" href=https://github.com/vicwang163>https://github.com/vicwang163</a></div>
    <div class="editor-mask" v-if="content"></div>
  </div>
</template>

<script>
export default {
  name: 'editor-item',
  props: ['id', 'html', 'row', 'content'],
  computed: {
    editorId () {
      return 'editor' + this.id
    }
  },
  mounted () {
    if (this.content) {
      let editor = window.ace.edit(this.editorId)
      editor.setValue(this.content)
      editor.$blockScrolling = Infinity
      editor.session.setMode('ace/mode/javascript')
      editor.gotoLine(this.row)
      editor.setReadOnly(true)
    }
  }
}
</script>

<style scoped>
.editor-item {
  position:relative
}
.editor-mask {
  position:absolute;
  left:0px;
  top:0px;
  right:0px;
  bottom:0px;
  z-index:9999;
}
.editor-block {
  height:300px;
}
</style>
