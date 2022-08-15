<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      action="#"
      :http-request="onRequest"
      list-type="picture-card"
      :file-list="fileList"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :before-upload="beforeUpload"
      :limit="1"
      class="custom-upload"
      :class="fileList.length ? 'hide' : ''"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog title="预览" width="50%" :visible.sync="previewImgDialog">
      <img :src="imgUrl" class="previewImg" />
    </el-dialog>
  </div>
</template>

<script>
// SecretId: AKIDlNn134ziFZrzsVt1ujKgplTwA9tNcbLq

// SecretKey: KPErIUR9cqsfDWZNwGLCn9G9mAJCqFPL
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDlNn134ziFZrzsVt1ujKgplTwA9tNcbLq',
  SecretKey: 'KPErIUR9cqsfDWZNwGLCn9G9mAJCqFPL',
})
console.log(cos)
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [
        // {
        //   name: 'food.jpg',
        //   url: 'https://img2.baidu.com/it/u=1814268193,3619863984&fm=253&fmt=auto&app=138&f=JPEG?w=632&h=500',
        // },
      ],
      previewImgDialog: false,
      imgUrl: '',
      loading: false,
    }
  },

  created() {},

  methods: {
    onRequest(data) {
      this.loading = true;
      console.log('自己上传图片')
      cos.putObject(
        {
          Bucket: 'caipaofan-1313341632' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: data.file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: data.file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          },
        },
        (err, data) => {
          //成功或失败均进入此函数
          //err null false 没有错
          //err 不为null true 有错
          this.loading = false;
          if (err || data.statusCode != 200) {
            return this.$message.error('亲，上传失败，请重试')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location,
          })
          console.log(err || data)
        },
      )
    },
    onChange(file, fileList) {
      console.log(fileList)
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      console.log(fileList)
      this.fileList = fileList
    },
    onPreview(file) {
      this.previewImgDialog = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      const type = ['image/jpeg', 'image/png', 'image/gif']
      if (!type.includes(file.type)) {
        this.$message.error('请选择' + type.join('、') + '图片')
        return false
      }

      const maxSize = 3 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('选择的图片不能超过2mb')
        return false
      }

      //   console.log('上传前检查', file)
    },
  },
}
</script>

<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
.previewImg {
  width: 100%;
}
</style>
