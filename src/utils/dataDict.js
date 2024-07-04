// 公司类型 默认
import {lowerFirst} from "lodash";

export const COMPANY_TYPE_ALL = 0

// 公司类型 自营
export const COMPANY_TYPE_SELF = 1

// 审核状态
export const APPROVAL_STATUS_DEFAULT = 0  // 默认
export const APPROVAL_STATUS_NO_PROCESS = 1  // 未审核
export const APPROVAL_STATUS_IN_PROCESS = 11 // 审核中
export const APPROVAL_STATUS_PASS = 30 // 已通过
export const APPROVAL_STATUS_NO_PASS = 2  // 未通过


// 买合同
export const CONTRACT_TYPE_BUY = 10

// 卖合同
export const CONTRACT_TYPE_SELL = 20

export const CONTRACT_TYPE = {
	[CONTRACT_TYPE_BUY]: '新车销售合同',
	[CONTRACT_TYPE_SELL]: '二手车购销合同',
}


export const PAYMENT_STATUS = {
	10: '未付款',
	20: '已支付-定金',
	30: '已支付（尾款或全款）',
	100: '未回款',
	110: '已收-定金',
	120: '已回款（尾款或全款）',
}

export const CONTRACT_FINANCE_STATUS = {
	0: '未付款/未回款',
	1: '部分付款/部分回款',
	2: '已付款/已回款',
}

export const ORDER_STATUS = {
	0: '正序',
	1: '倒序',
}

// 付款状态
export const FINANCE_STATUS_PAYER = {
	0: '未付款',
	1: '部分付款',
	2: '已付款',
}

// 收款状态
export const FINANCE_STATUS_PAYEE = {
	0: '未回款',
	1: '部分回款',
	2: '已回款',
}

export const USER_STATUS_TYPE = {
	0: "冻结",
	1: "正常",
}

export const FLOW_PAYMENT_TYPE = {
	1: '银行',
	2: '现金',
	3: '账户入账',
}

export const AllotTypeDeposit = 1 // 购销定金
export const AllotTypeFinal = 2 // 购销尾款
export const AllotTypeTotal = 3 // 购销全款
export const AllotTypeCarRefund = 4 // 车辆退款
export const AllotTypeInsureRefund = 5 // 保险退款
export const AllotTypeOtherRefund = 6 // 其他退款
export const AllotTypeOtherThirdPay = 7 // 三方代付押金
export const AllotTypeOtherTurnover = 8 // 周转款
export const AllotTypeOtherAdvanceFund = 9 // 车辆海外定金
export const AllotTypeOtherSettle = 10// 结算款分配
export const AllotTypeThirdBehalf = 11// 代收代付
export const AllotTypePayErrorRefund = 12// 支付错误退款

export const ALLOC_TYPE = {
	[AllotTypeDeposit]: '购销定金',
	[AllotTypeFinal]: '购销尾款',
	[AllotTypeTotal]: '购销全款',
	[AllotTypeCarRefund]: '车辆退款',
	[AllotTypeInsureRefund]: '保险退款',
	[AllotTypeOtherRefund]: '其他退款',
	[AllotTypeOtherThirdPay]: '三方代付押金',
	[AllotTypeOtherTurnover]: '周转款',
	[AllotTypeOtherAdvanceFund]: '车辆海外定金',
	// [AllotTypeOtherSettle]: '车辆结算',
  [AllotTypeThirdBehalf]: '代收代付',
  [AllotTypePayErrorRefund]: '支付错误退款',
}

// 二手车购销合同
// [1,2,3,7]
export const SELL_ALLOC_TYPE = {};

// 新车销售合同
// [4,5,6,8]
export const BUY_ALLOC_TYPE = {};

(() => {
	// 自执行函数
	for (let number of [1, 2, 3, 7]) {
		SELL_ALLOC_TYPE[number] = ALLOC_TYPE[number]
	}

	for (let number of [4, 5, 6, 8]) {
		BUY_ALLOC_TYPE[number] = ALLOC_TYPE[number]
	}

})();

export const PaymentTypeCarDeposit = 1  // 车辆采购-付定金
export const PaymentTypeCarFinal = 2  // 车辆采购-付尾款
export const PaymentTypeCarTotal = 3  // 车辆采购-付全款
export const PaymentTypeCarPledge = 4  // 车辆采购-付押金
export const PaymentTypeOtherInsurance = 5  // 车辆采购-保险费
export const PaymentTypeOtherLicense = 6  // 其他支出-上牌费
export const PaymentTypeOtherTransfer = 7  // 其他支出-过户费
export const PaymentTypeOtherInvoice = 8  // 其他支出-票外支出
export const PaymentTypeOtherPurchase = 9  // 其他支出-进销差价
export const PaymentTypeOtherService = 10 // 其他支出-服务费
export const PaymentTypeOtherThirdCommission = 11 // 其他支出-结算费用
export const PaymentTypeCarOther = 12 // 车辆采购-付其他费用
export const PaymentTypeLoanRepayment = 13 // 资金-借贷还款
export const PaymentTypeOtherThirdPayRefund = 14 // 其他费用-三方代付押金退款
export const PaymentTypeOtherTurnoverRefund = 15 // 其他费用-周转款退款
export const PaymentTypeOtherInlandSettle = 16 // 国内订单结算款
export const PaymentTypeOtherSettle = 17 // 其他支出-结算费用
export const PaymentTypeOtherLogistics = 18 // 其他支出-物流费
export const PaymentTypeOtherStorage = 19 // 其他支出-仓储费

// 海外业务系统（同步功能点）
export const PaymentTypeWalletWithdraw = 105 // 账户提现
export const PaymentTypeInlandDepositRefund = 103 // 定金退款-原路退回

// 付款用途
export const PAYMENT_USE_TYPE = {
	[PaymentTypeCarDeposit]: '车辆采购-付定金',
	[PaymentTypeCarFinal]: '车辆采购-付尾款',
	[PaymentTypeCarTotal]: '车辆采购-付全款',
	[PaymentTypeCarPledge]: '车辆采购-付押金',
	[PaymentTypeOtherInsurance]: '车辆采购-保险费',
	[PaymentTypeCarOther]: '车辆采购-付其他费用',
	[PaymentTypeOtherLicense]: '其他支出-上牌费',
	[PaymentTypeOtherTransfer]: '其他支出-过户费',
	[PaymentTypeOtherInvoice]: '其他支出-票外支出',
	// [PaymentTypeOtherPurchase]: '其他支出-进销差价',
	[PaymentTypeOtherService]: '其他支出-服务费',
	[PaymentTypeOtherThirdCommission]: '其他支出-三方佣金',
	[PaymentTypeOtherLogistics]: '其他支出-物流费',
	[PaymentTypeOtherStorage]: '其他支出-仓储费',
  // [PaymentTypeOtherSettle]: '其他支出-结算费用',
	[PaymentTypeOtherThirdPayRefund]: '其他费用-三方代付押金退款',
	[PaymentTypeOtherTurnoverRefund]: '其他费用-周转款退款',
	[PaymentTypeLoanRepayment]: '资金-借贷还款',
	[PaymentTypeWalletWithdraw]: '账户提现',
	[PaymentTypeInlandDepositRefund]: '定金退款-原路退回',
	[PaymentTypeOtherInlandSettle]: '国内订单结算款',
}
// 付款用途 - 排序
export const PAYMENT_USE_TYPE_ORDER = [
  //车辆采购
  {
    "Key":PaymentTypeCarDeposit,
    "Value":'车辆采购-付定金',
  },
  {
    "Key":PaymentTypeCarFinal,
    "Value":'车辆采购-付尾款',
  },
  {
    "Key":PaymentTypeCarTotal,
    "Value":'车辆采购-付全款',
  },
  {
    "Key":PaymentTypeCarPledge,
    "Value":'车辆采购-付押金',
  },
  {
    "Key":PaymentTypeOtherInsurance,
    "Value":'车辆采购-保险费',
  },
  {
    "Key":PaymentTypeCarOther,
    "Value":'车辆采购-付其他费用',
  },
  //其他支出
  {
    "Key":PaymentTypeOtherLicense,
    "Value":'其他支出-上牌费',
  },
  {
    "Key":PaymentTypeOtherTransfer,
    "Value":'其他支出-过户费',
  },
  {
    "Key":PaymentTypeOtherInvoice,
    "Value":'其他支出-票外支出',
  },
  // {
  //   "Key":PaymentTypeOtherPurchase,
  //   "Value":'其他支出-进销差价',
  // },
  {
    "Key":PaymentTypeOtherService,
    "Value":'其他支出-服务费',
  },
  {
    "Key":PaymentTypeOtherThirdCommission,
    "Value":'其他支出-三方佣金',
  },
  {
    "Key":PaymentTypeOtherLogistics,
    "Value":'其他支出-物流费',
  },
  {
    "Key":PaymentTypeOtherStorage,
    "Value":'其他支出-仓储费',
  },
  // {
  //   "Key":PaymentTypeOtherSettle,
  //   "Value":'其他支出-结算费用',
  // },
  {
    "Key":PaymentTypeOtherThirdPayRefund,
    "Value":'其他费用-三方代付押金退款',
  },
  {
    "Key":PaymentTypeOtherTurnoverRefund,
    "Value":'其他费用-周转款退款',
  },


  {
    "Key":PaymentTypeLoanRepayment,
    "Value":'资金-借贷还款',
  },
  {
    "Key":PaymentTypeWalletWithdraw,
    "Value":'账户提现',
  },
  {
    "Key":PaymentTypeInlandDepositRefund,
    "Value":'定金退款-原路退回',
  },
  {
    "Key":PaymentTypeOtherInlandSettle,
    "Value":'国内订单结算款',
  },
]
// 使用用途对应列表字段
export const USE_ID_2_COLUMN = {
	// 其他支出-上牌费
	[PaymentTypeOtherLicense]: 'licenseFee',
	// 其他支出-过户费
	[PaymentTypeOtherTransfer]: 'transferFee',
	// 其他支出-票外支出
	[PaymentTypeOtherInvoice]: 'nonInvoiceFee',
	// 车辆采购-保险费
	[PaymentTypeOtherInsurance]: 'insuranceFee',
	// 其他支出-结算费用
	[PaymentTypeOtherInlandSettle]: 'closingCost',
}

// 合并付款用途
export const MERGE_PAYMENT_USE_TYPE = {
	[PaymentTypeOtherSettle]: '其他支出-结算费用',
}

// 合并付款
export const MERGE_PAYMENT_USE_TYPE2 = {
	[PaymentTypeOtherInlandSettle]: PAYMENT_USE_TYPE[PaymentTypeOtherInlandSettle],
}

//付款记录发票状态
export const PAYMENT_INVOICE_STATUS = {
    1: '未开票',
    2: '部分开票',
    3: '已开票',
    10: '不开票',
}

// 发票申请
export const INVOICE_TYPE = {
	1: '增值税专用发票',
	2: '增值税普通发票',
}

export const RECEIVE_INVOICE_TYPE = {
	...INVOICE_TYPE,
	3: '机动车销售统一发票',
	4: '二手车销售统一发票',
	5: '车辆购置税发票',
}

// 合同发票类型
export const CONTRACT_INVOICE_TYPE = {
	0: '车辆购置发票',
	1: '增值税专用发票',
}

// 否/是枚举
export const NO_YES_TYPE = {
	0: '否',
	1: '是',
}

// 定金+尾款
export const CONTRACT_PAYMENT_TYPE_PART = 0

// 全款
export const CONTRACT_PAYMENT_TYPE_ALL = 1

// 合同付款类型
export const CONTRACT_PAYMENT_TYPE = {
	[CONTRACT_PAYMENT_TYPE_PART]: "定金+尾款",
	[CONTRACT_PAYMENT_TYPE_ALL]: "全款"
}

// 车辆交车方式
export const CAR_TRANSPORT_TYPE = {
	0: "是",
	1: "否",
}

// 审核状态通过
export const APPROVAL_TYPE = {
	1: '通过',
	0: '未通过',
}

export const dic2arr = function (dic) {

}

// 订单回款状态
export const ORDER_RECEIVABLE_STATUS = {
	10: "未回款",
	20: "部分回款",
	30: "已回款",
}

export const APPROVAL_STATUS = {
	approving: [0, 1, 11],
	approved: [30],
	unapproved: [1],
}

// 合同状态
export const CONTRACT_STATUS = {
	0: '未提交',
	1: '待审核',
	11: '审核中',
	2: '已驳回',
	30: '已审核',
	40: '已归档',
	50: '已作废',
}

// 销售合同定金+尾款
export const BUY_TIMELINE_PART = [
	{
		key: 1,
		value: '订单与采购合同审批',
	},
	{
		key: 2,
		value: '付采购定金审批',
	},
	{
		key: 3,
		value: '付尾款审批',
	},
	{
		key: 5,
		value: '提车',
	}
]


// 购销合同全款
export const BUY_TIMELINE_ALL = [
	{
		key: 1,
		value: '订单与采购合同审批',
	},
	{
		key: 4,
		value: '付全款审批'
	},
	{
		key: 5,
		value: '提车',
	}
]

// 购销合同定金+尾款
export const SELL_TIMELINE_PART = [
	{
		key: 9,
		value: '购销合同审批（我方盖章）',
	},
	{
		key: 10,
		value: '购销合同待购方盖章',
	},
	{
		key: 11,
		value: '收购销定金审批',
	},
	{
		key: 16,
		value: '收购销尾款审批',
	},
]


// 购销合同全款
export const SELL_TIMELINE_ALL = [
	{
		key: 9,
		value: '购销合同审批（我方盖章）'
	},
	{
		key: 10,
		value: '购销合同待购方盖章'
	},
	{
		key: 12,
		value: '收购销全款审批'
	},
]

// 订单时间线
export const ORDER_TIMELINE = {
	1: '订单与新车销售合同审批',
	2: '付采购定金审批',
	3: '付采购尾款审批',
	4: '付采购全款审批',
	5: '提车',
	6: '车辆入库',
	8: '车辆上牌',
	14: '开票审批',
	15: '车辆过户',
	18: '结算费用审批',
	19: '完成订单',
}


// 订单时间线全款+尾款
export const ORDER_TIMELINE_ALL = [
	{
		"key": 5,
		"value": "提车"
	},
	{
		"key": 6,
		"value": "车辆入库"
	},
	{
		"key": 8,
		"value": "车辆上牌"
	},
	{
		"key": 14,
		"value": "开票审批"
	},
	{
		"key": 15,
		"value": "车辆过户"
	},
	{
		"key": 18,
		"value": "结算费用审批"
	},
	{
		"key": 19,
		"value": "完成订单"
	}
]

// 订单时间线全款
export const ORDER_TIMELINE_PART = [
	{
		"key": 5,
		"value": "提车"
	},
	{
		"key": 6,
		"value": "车辆入库"
	},
	{
		"key": 8,
		"value": "车辆上牌"
	},
	{
		"key": 14,
		"value": "开票审批"
	},
	{
		"key": 15,
		"value": "车辆过户"
	},
	{
		"key": 18,
		"value": "结算费用审批"
	},
	{
		"key": 19,
		"value": "完成订单"
	}
]

export const PAYMENT_APPROVAL_STATUS_PROCESS = 1
export const PAYMENT_APPROVAL_STATUS_PASS = 1
export const PAYMENT_APPROVAL_STATUS_NO_PASS = 1
export const PAYMENT_APPROVAL_STATUS_PAY = 1

export const PAYMENT_APPROVAL_STATUS = {
	1: '待审核',
	2: '已通过',
	3: '未通过',
	4: '已付款',
}

// 银行打款状态
export const BANK_STATUS_PROCESSING = 0; // 银行处理中
export const BANK_STATUS_SUCCESS = 1; // 成功
export const BANK_STATUS_ERROR = 2; // 失败
export const BANK_STATUS_SUSPICIOUS = 3; // 可疑
export const BANK_STATUS_NONENTITY = 4; // 记录不存在
export const BANK_STATUS_WAIT_AUTH = 5; // 待授权
export const BANK_STATUS_REFUSE_AUTH = 6; // 授权拒绝
export const BANK_STATUS_NONE = 100 // 待处理

export const BANK_STATUS = {
	[BANK_STATUS_PROCESSING]: '银行处理中',
	[BANK_STATUS_SUCCESS]: '成功',
	[BANK_STATUS_ERROR]: '失败',
	[BANK_STATUS_SUSPICIOUS]: '可疑',
	[BANK_STATUS_NONENTITY]: '记录不存在',
	[BANK_STATUS_WAIT_AUTH]: '待授权',
	[BANK_STATUS_REFUSE_AUTH]: '授权拒绝',
	[BANK_STATUS_NONE]: '待处理',
}

// 记录状态与订单流程对应关系
export const sellStatus2OrderStatus = {
	// 1:合同审批 2:待盖章 3:定金审批 4:尾款审批 5:全款审批 10已回款
	1: 9,
	2: 10,
	3: 11,
	4: 16,
	5: 12,
}


// 借款的还款状态
export const DEBIT_REPAYMENT_STATUS = {
	1: '未还款',
	2: '部分还款',
	3: '已还款',
}

// 垫款模式（默认类型）
export const ORDER_TYPE_ADVANCE_PAYMENT = 1
// 挂牌模式（全款模式、业务流程可能不同）
export const ORDER_TYPE_FULL_PAYMENT = 2

export const ORDER_TYPE_STATUS = {
	[ORDER_TYPE_ADVANCE_PAYMENT]: '垫款模式',
	[ORDER_TYPE_FULL_PAYMENT]: '挂牌模式',
}

// 回款的定义
export const FinanceCostRefundStatus = {
	0: '未还款',
	1: '还款中',
	2: '已还款'
}

// 合同三方付款状态
export const ContractThirdPaidStatus = {
	1: '未收款',
	2: '部分收款',
	3: '已收全款',
	4: '部分退款',
	5: '已退款'
}

// 订单结算状态
export const ORDER_SETTLE_STATUS = {
	0: '全部',
	1: '未结算',
	2: '已结算',
}


// 合同作废状态
export const CONTRACT_INVALID_STATUS = {
	0: '待作废',
	1: '作废中',
	2: '已作废',
}
