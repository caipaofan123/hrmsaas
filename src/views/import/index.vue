<template>
  <div>
    导入页面

    <UploadExcel
      :beforeUpload="excelSuccess"
      :onSuccess="onSuccess"
    ></UploadExcel>
  </div>
</template>

<script>
import employees from '@/constant/employees'
import UploadExcel from '@/components/UploadExcel'
import {importEmployees} from '@/api/employees'
import { formatTime } from '@/filters'
const {importMapKeyPath} = employees
export default {
  data() {
    return {
      
    }
  },
  components: {
    UploadExcel,
  },
  created() {},

  methods: {
    excelSuccess({ name }) {
      // const maxSize=true
      // if (maxSize) {
      //     return false
      // }
      // console.log('继续上传');
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请选择xlsx文件')
        return false
      }
      return true
    },
    async onSuccess({ header, results }) {
      console.log(header)
      console.log(results)
      const newArr=results.map(item=>{
        const obj = {}
        for(let key in importMapKeyPath){
          if (key==='入职日期'||key==='转正日期') {
            
            const timestamp= item[key]
            const date=new Date((timestamp-1)*24*3600000)
            date.setFullYear(date.getFullYear()-70)
            obj[importMapKeyPath[key]] = formatTime(date)
          }else{
            obj[importMapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      console.log(newArr);
      await importEmployees(newArr)
      this.$message.success('导入成功')
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped></style>
