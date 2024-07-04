<template>
    <div>
        <el-form :inline="true" :model="form" ref="formRef" style="margin-top: 20px">
            <el-form-item label="车型" prop="carModel">
                <el-input v-model="form.carModel" placeholder="车型" clearable/>
            </el-form-item>
            <el-form-item label="订单ID" prop="code">
                <el-input v-model="form.code" placeholder="订单ID" clearable/>
            </el-form-item>
            <el-form-item label="合同ID" prop="contractCode">
                <el-input v-model="form.contractCode" placeholder="支持任意合同ID" clearable/>
            </el-form-item>
            <br>
            <el-form-item label="车架号" prop="carVin">
                <el-input v-model="form.carVin" placeholder="车架号" clearable/>
            </el-form-item>
            <el-form-item label="创建人" prop="createName">
                <el-input v-model="form.createName" placeholder="创建人" clearable/>
            </el-form-item>
            <br>
            <el-form-item label="订单创建时间" prop="createDate">
                <el-date-picker
                    v-model="form.createDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    clearable
                />
            </el-form-item>
            <el-form-item>
                <el-button plain :disabled="loading" @click="resetForm(formRef)">重置</el-button>
                <el-button type="primary" :loading="loading" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="orderList" style="width: 100%">
            <el-table-column prop="id" label="ID"/>
            <el-table-column prop="code" label="订单号"/>
            <el-table-column prop="car_model" label="车型" />
            <el-table-column prop="create_time" label="创建时间">
                <template #default="scope">
                    {{ $formatTime(scope.row.create_time) }}
                </template>
            </el-table-column>
        </el-table>
<!--        <el-pagination style="margin-top: 10px;" background layout="->, prev, pager, next, jumper" :total="total" :default-page-size="currentPageSize" @current-change="onPageChange"/>-->
        <el-pagination
            style="margin-top: 10px"
            v-model:current-page="currentPage"
            :page-size="currentPageSize"
            background
            layout="->, total, prev, pager, next, jumper"
            :total="total"
            @current-change="onPageChange"
        />
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {reactive} from "vue";
import {
    $formatTime,
    $format2percentile,
    $formatDict,
    financeStatus
} from "@/utils/format";

import {$get} from "@/utils/request";
import {usePagination} from "@/utils/use.js";

const form = reactive({
    carModel: '',
    createName: '',
    code: '',
    contractCode: '',
    carVin: '',
    createDate: [],
    // 回款状态查询 查询的是对应的买车合同信息
    financeStatus: null,
    orderStatusGroup: 0,
    settleStatus: 1,
})

const {
  list: orderList,
  total,
  currentPage,
  currentPageSize,
  loading,
  onPageChange,
  onSubmit
} = usePagination('orderList', form)

onMounted(async () => {
  // 加载数据
  await onSubmit()
})
</script>
