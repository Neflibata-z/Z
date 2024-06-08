<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                MYD
                <el-form>
                    <el-form-item label="Activity zone">
                        <el-select v-model="sizeForm.region" placeholder="please select your zone">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
                        <el-button @click="resetForm(formRef)">Reset</el-button>
                    </el-form-item></el-form>
            </el-header>
            <el-main><el-table :data="tableData" style="width: 100%">
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
                </el-table></el-main>
        </el-container>
    </div>
</template>
<script setup lang="ts">

</script>
