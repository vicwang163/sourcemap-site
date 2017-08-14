<template>
  <div class="error-info">
  <div v-if="realStack">
    <div class="back">
      <i class="el-icon-arrow-left" @click="goBack()"></i>
    </div>
    <el-collapse v-model="activeName" @change="handleChange">
      <el-collapse-item class="collapse-left" v-for="(item, index) in realStack" :title="item.filepath + ':' + (item.row)" :name="index" :key="index" >
        <editor-item :id="index" :row="item.row" :html="item.html" :content="item.content"></editor-item>
      </el-collapse-item>
    </el-collapse>
  </div>
  <div v-else>
    <el-alert v-if="errorTitle" :title="errorTitle" type="error"></el-alert>
    <el-form ref="form" class="form" :model="form" label-width="80px" action="/showstack" method="post">
      <el-form-item label="map 地址">
        <el-input v-model="form.mapUrl" name="mapUrl"></el-input>
      </el-form-item>
      <el-form-item label="map文件名">
        <el-input v-model="form.mapName" name="mapName"></el-input>
      </el-form-item>
      <el-form-item label="错误信息">
        <el-input type="textarea" v-model="form.desc" name="desc" :rows="5"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="hidden" name="_csrf" v-model="form._csrf" />
        <el-button type="primary" @click="submitForm('form')" class="submitBtn">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import EditorItem from './EditorItem'
import fetch from 'isomorphic-fetch'
export default {
  name: 'error-info',
  data () {
    return {
      form: {
        mapUrl: '',
        mapName: '[name].js.map',
        desc: `
        "TypeError: console.logs is not a function
        at n (http://localhost:8082/app.js:6:180422)
        at a.clickme (http://localhost:8082/app.js:6:180791)
        at Proxy.r (http://localhost:8082/app.js:6:1053)
        at click (http://localhost:8082/app.js:6:172962)
        at HTMLHeadingElement.t (http://localhost:8082/app.js:6:7539)"`,
        _csrf: Cookie.get('csrfToken')
      },
      errorTitle: '',
      activeName: 0,
      realStack: null
    }
  },
  components: {
    EditorItem
  },
  methods: {
    submitForm () {
      let data = []
      for (let index in this.form) {
        data.push(index + '=' + this.form[index])
      }
      data = data.join('&')
      fetch('/showstack', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body: data
      }).then((res) => {
        return res.json()
      }).then((res) => {
        if (res.length > 0) {
          this.realStack = res
          this.activeName = 0
        } else if (res.message) {
          this.errorTitle = res.message
        }
      }).catch(() => {
        console.error(arguments)
      })
    },
    goBack () {
      this.realStack = null
    },
    handleChange () {
      for (let i = 0; i < this.activeName.length; i++) {
        let key = this.activeName[i]
        if (document.querySelector('#editor' + key)) {
          setTimeout(() => {
            window.ace.edit('editor' + key).centerSelection()
          }, 500)
        }
      }
    }
  }
}
</script>

<style scoped>
.error-info {
  font-weight: normal;
}
  
.form {
  margin-top:10px;
}

.back {
  text-align:left;
  margin-bottom:10px;
}
.submitBtn {
  width:100%;
}
.collapse-left {
  text-align:left
}

</style>
