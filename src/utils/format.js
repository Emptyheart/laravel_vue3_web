import dayjs from "dayjs";
import {isNull, get, set, isString, isUndefined, sumBy} from "lodash";
import * as R from "ramda";
import {
	CONTRACT_TYPE_BUY,
	CONTRACT_TYPE_SELL, FINANCE_STATUS_PAYEE,
	FINANCE_STATUS_PAYER,
} from "@/utils/dataDict";
import nzhcn from "nzh/cn";
import {groupBy} from "ramda";

// 保存原始的 originalFormat 方法
const originalFormat = dayjs.prototype.format;

// 重写 toJSON 方法
dayjs.prototype.format = function () {
	const res = originalFormat.call(this, ...arguments);
	if (res === 'Invalid Date') return '-';
	return res;
};


export function formatTime(row, column, value) {
	return $formatTime(value)
}

export function formatDate(row, column, value) {
	return $formatTime(value, 'YYYY-MM-DD')
}

export function $formatDate(value, format = 'YYYY-MM-DD') {
	if (!value) return '-'
	return dayjs(value).format(format)
}

export function $formatTime(value, format = 'YYYY-MM-DD HH:mm') {
	if (!value) return '-'
	return dayjs(value).format(format)
}

export function formatDict(dict) {
	return function (row, column, value) {
		return dict[value] || value
	}
}

export function $formatDict(dict) {
	return function (value) {
		return dict[value] || value
	}
}

/**
 * 格式化金额输出
 *
 * @param amount 金额
 * @param zero 是否允许零值
 * @returns {string}
 */
export function $format2percentile(amount, zero = false) {

	if (zero && amount === 0) {
		return '0元'
	}

	// 非0返回0
	if (!amount) return '-'

	// 格式化数据输出
	return (Math.round((+amount) * 100) / 100 + "").replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '元'
}

/**
 * 格式化金额输出
 *
 * @param row 数据
 * @param column label="车辆开票价" width="100"
 * @param value 金额 prop="invoiceFee"
 * @returns {string}
 */
export function format2percentile(row, column, value) {
	return $format2percentile(value)
}

/**
 * 小数格式化成百分数
 *
 * @param row
 * @param column
 * @param value
 * @returns {string}
 */
export function formatFloat2percentile(row, column, value) {
	if (isNull(value) || isUndefined(value)) return '-'
	return (+value * 100).toFixed(2) + '%'
}

export function $formatFloat2percentile(value) {
	return formatFloat2percentile(null, null, value)
}

export function format2percentileWithSell(row, column, value) {
	if (!row.sellContractId) {
		return '-'
	}
	return $format2percentile(value)
}


/**
 * 格式化合同的收付款信息展示
 *
 * @param contract
 * @returns {*|string|string}
 */
export function financeStatus(contract) {
	// 判断合同状态
	switch (contract.type) {
		case CONTRACT_TYPE_BUY: {

			return FINANCE_STATUS_PAYER[contract.financeStatus] || '-'
		}
		case CONTRACT_TYPE_SELL: {
			return FINANCE_STATUS_PAYEE[contract.financeStatus] || '-'
		}
		default:
			return '-'
	}
}

/**
 * 格式化大写金额
 *
 * @param amount
 * @returns {string}
 */
export function $formatAmountB(amount) {
	if (!amount) return ''
	return nzhcn.encodeB(amount) + '圆'
}

/**
 * 格式化车型信息
 *
 * @param cars 车辆数据
 * @returns {string}
 */
export function $cars2info(cars) {
	if (!cars.length) return "未选择"
	const group = groupBy(v => `${v.model} ${v.params}`, cars)
	return Object.keys(group).map(k => `${k}【${group[k].length}】台`).join(",")
}

/**
 * 附件转化
 *
 * @param annexes
 * @returns {*}
 */
export function $files2annexes(annexes) {
	// 遍历数据
	return annexes.map(v => {
		return {
			id: v.id,
			name: v.name,
			path: v.path || v.raw.path
		}
	})
}

export function format2Rate(row, column, value) {
	if (!value) return '-'
	const percent = Number(+value * 100).toFixed(2);
	return percent + "%";
}


// 头尾添加合计行
export function addSummaryRow(data = [], keys = []) {
	if (data.length === 0) return data
	const row = {
		id: '合计',
		summary: true,
	}

	keys.forEach(key => {
		set(row, key, sumBy(data, r => +get(r, key)))
	})

	return [row, ...data, row]
}

// 格式化层级结构 目前仅支持二级结构
export function formatLevel(userGroup) {
	if (userGroup.parentId === 0) return userGroup.groupName;
	return '└─' + userGroup.groupName;
}

// 车辆格式化成 车型信息
export function formatCars2CarModel(row, column, value) {
	if (!value) return '-'
	const group = R.groupBy(R.prop("model"))(value)
	return Object.keys(group).map(k => `${k}【${group[k].length}】台`).join(',')
}

// 空返回 可以传入format
export function formatZero2Dash(format) {
	return function (row, column, value) {
		if (!value) return '-'
		if (value === 0) return '-'
		if (value === '0') return '-'
		if (value === '0.00') return '-'
		if (value === '0001-01-01T00:00:00Z') return '-'
		if (typeof format === 'function') {
			return format(...arguments)
		}
		return value
	}
}

export function formatPrefix(prefix) {
	return function (row, column, value) {
		if (!value) return '-'
		return prefix + value
	}
}

export function formatSuffix(suffix) {
	return function (row, column, value) {
		if (!value) return '-'
		return value + suffix
	}
}

export function groom(o) {

	function noNullUndefinedOrEmptyString(v) {

		// 如果是string 并且不为空
		if (isString(v) && v.length) {
			return v.trim()
		}

		return v !== null && v !== undefined && v !== '';
	}

	function replacer(key, value) {

		// 如果是string 并且不为空
		if (isString(value) && value.length) {
			return value.trim()
		}

		if (value === null || value === '') {
			return undefined; //never return null or empty strings in our JSON
		}
		if (Array.isArray(value)) {
			return value.filter(noNullUndefinedOrEmptyString);
		}
		return value;
	}

	return JSON.parse(JSON.stringify(o, replacer));
}


