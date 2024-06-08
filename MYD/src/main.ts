import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//import VXETable from 'vxe-table'
//import 'vxe-table/lib/style.css'
//import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
//import ExcelJS from 'exceljs'

/* VXETable.use(VXETablePluginExportXLSX, {
    ExcelJS
  }) */
createApp(App).use(ElementPlus).mount('#app')//.use(VXETable)
//createApp(App).mount('#app')
