<template>
    <div>
      <h3>用户管理系统</h3>
    </div>
</template>

<script setup>
import {ref} from "vue";
import {reactive} from "vue";
import {
    $formatTime,
    $format2percentile,
    $formatDict,
    financeStatus
} from "@/utils/format";
import {
    APPROVAL_STATUS_PASS,
    CONTRACT_STATUS,
    ORDER_RECEIVABLE_STATUS,
    PaymentTypeCarDeposit,
    PaymentTypeCarFinal,
    PaymentTypeCarTotal,
    ORDER_TYPE_STATUS,
    ORDER_TYPE_FULL_PAYMENT,
    ContractThirdPaidStatus, ORDER_TYPE_ADVANCE_PAYMENT, ORDER_SETTLE_STATUS,
} from "@/utils/dataDict";

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

defineProps({
    orderList: {
        type: [],
    }
});
</script>
