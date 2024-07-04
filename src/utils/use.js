import {computed, ref} from "vue";
import router from "@/router/index.js";
import {PAGE_SIZE} from "@/utils/config.js";
import {$get} from "@/utils/request.ts";

export const lastTitle = ref()

export const breadcrumbs = computed(() => {


	const route = router.currentRoute.value
	const routers = [
		{
			title: route.matched[1].meta.root
		},
		...route.matched.filter(v => v.path !== "/").map(v => {
			return {
				title: v.meta.title,
				path: v.path,
			}
		})
	]

	// 删除最后一项path
	delete routers[routers.length - 1].path

	// 响应式设置最后一个title
	if (lastTitle.value) {
		routers[routers.length - 1].title = lastTitle.value
	}

	// 匹配path中的param
	routers.filter(v => v.path).forEach(router => {
		for (let key in route.params) {
			router.path = router.path.replace(`:${key}`, route.params[key])
		}
	})

	return routers
})

// ratio实现单选机制
export function useRatio(onSelect) {

	// 单选框
	const radios = {}

	// 选择radio
	const onClick = ($event, item) => {
		Object.values(radios).forEach(e => {
			if (e) {
				e.target.checked = false
			}
		})
		radios[item.id] = $event
		$event.target.checked = true
		onSelect?.(item.id)
	}

	const onClear = () => {
		// 取消状态选择
		Object.values(radios).forEach(e => {
			if (e) {
				e.target.checked = false
			}
		})
		onSelect?.(null)
	}

	return {
		onClick,
		onClear,
	}
}

/**
 * 分页的use
 *
 * @param url 请求地址
 * @param params 请求参数
 */
export function usePagination(url, params, callback) {
	// 列表
	const list = ref([])
	// 总数
	const total = ref(0)
	// 其它详情
	const info = ref()
	// 当前页面
	const currentPage = ref(1)
	// 当前页面的分页
	const currentPageSize = PAGE_SIZE
	// 加载状态
	const loading = ref(false)

	if(!params) {
		params = Object.create(null)
	}

	const onPageChange = async function () {
		try {
			loading.value = true
			const {data: _list, total: _total, info: _info} = await $get(url, {
				...params,
				page: currentPage.value,
				pageSize: currentPageSize,
			})
			list.value = _list
			total.value = _total
			info.value = _info
		} finally {
			loading.value = false
		}
	}

	const onSubmit = async function () {
		currentPage.value = 1
		await onPageChange()
	}

	return {
		list,
		total,
		currentPage,
		currentPageSize,
		loading,
		onPageChange,
		onSubmit,
		info,
	}
}
