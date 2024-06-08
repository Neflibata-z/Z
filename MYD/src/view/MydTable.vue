<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-form ref="formRef">
                    <el-form-item label="Activity zone">
                        <el-cascader v-model="value" :options="options" :props="props"
                            @change="handleChange" /></el-form-item><el-form-item>
                        <el-button type="primary" @click="submitForm()">Submit</el-button>
                        <el-button @click="resetForm(formRef)">Reset</el-button>
                    </el-form-item></el-form>
            </el-header>
            <el-main>
                <div>统计表</div>
                <el-table :data="table.tableData" style="width: 100%" v-if="table.tableShow">
                    <el-table-column v-for="item in table.tableHeader" :prop="item.date" :label="item.title"
                        width="150" />
                </el-table>
                <!--                 <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="Date" width="150" />
                    <el-table-column label="Delivery Info">
                        <el-table-column prop="name" label="Name" width="120" />
                        <el-table-column label="Address Info">
                            <el-table-column prop="state" label="State" width="120" />
                            <el-table-column prop="city" label="City" width="120" />
                            <el-table-column prop="address" label="Address" />
                            <el-table-column prop="zip" label="Zip" width="120" />
                        </el-table-column>
                    </el-table-column>
                </el-table> -->
            </el-main>
        </el-container>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
const props = {
    expandTrigger: 'hover' as const,
}
const value = ref([])
const options = [
    {
        value: 'guide',
        label: 'Guide',
        children: [
            {
                value: 'disciplines',
                label: 'Disciplines',
                children: [
                    {
                        value: 'consistency',
                        label: 'Consistency',
                    },
                ],
            },]
    }]
const formRef = ref<FormInstance>()
const table: any = reactive({
    tableShow: false,
    tableHeader: [{ date: 'name', title: 'Name' }, { date: 'state', title: "State" }], 
    tableData: [{ name: 'z', state: '1' }]
})
//const tableHeader:any=[{date:'name',title:'Name'},{date:'state',title:"State"}];
//const tableData:any = [{name:'z',date:'1'}];
//const tableShow:boolean=false;
const handleChange = (val: any) => {
    console.log(val);
}
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields();
    table.tableShow = false;
}
const submitForm = () => {
    table.tableShow = true;
}
</script>
