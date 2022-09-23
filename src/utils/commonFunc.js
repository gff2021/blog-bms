import { Select } from 'antd';

const { Option } = Select;

/**
 * @description - 根据数组或者对象生成并输出Select组件的下拉选项数组
 * @author Guff <3204966069@qq.com>
 * @param {Object|Object[]}  data - 传入的源数据，支持对象或者子项为Object的数组，数组格式如下
 * @param {Object[].item} - {value: 'value1', description: 'description'}
 * @param {Object} [config] - 额外的配置项，可选 
 * @param {Boolean} config.showValue - 是否显示描述对应的值，默认为false
 * @param {Boolean} config.showNoneSelect - 是否显示空值选项，默认为true
 * @returns {Array} - 返回Select.Option的数组
 */
export function getOptions(data, config = { showValue: false, showNoneSelect: true }) {
	const { showValue, showNoneSelect } = config;
	const options = [];
	if (Object.prototype.toString.call(data) === '[object Object]') {
		Object.keys(data).forEach(item => {
			options.push(
				<Option key={item} value={item}>
					{showValue ? `${data[item]}(${item})` : `${data[item]}`}
				</Option>
			)
		})
	}
	else if (Object.prototype.toString.call(data) === '[object Array]') {
		if (data.length) {
			data.forEach(item => {
				const { value, description } = item;
				options.push(
					<Option key={value} value={value}>
						{showValue ? `${description}(${value})` : `${description}`}
					</Option>
				)
			})
		}
	}
	else {
		throw new Error('Paramter type error!')
	}
	if (showNoneSelect) {
		options.unshift(
			<Option key='' value=''>
				请选择
			</Option>
		)
	}
	return options;
}

/**
 * @description - 根据value返回对应的description，用于表格列展示
 * @param {String} value - 从后端获取到的value
 * @param {Object|Object[]} sourceData - 用于查找description的源数据，支持对象或者子项为Object的数组，数组格式如下
 * @param {Object[].item} - {value: 'value1', description: 'description'}
 * @returns {String} - 返回value对应的description
 */
export function getTextByValue(value, sourceData) {
	let description = '';
	if (Object.prototype.toString.call(sourceData) === '[object Array]') {
		sourceData.forEach(item => {
			if (item.value === value) {
				description = item.description;
			}
		})
	} else if (Object.prototype.toString.call(sourceData) === '[object Object]') {
		description = sourceData[value] || ''
	} else {
		throw new Error('Paramter type error!')
	}
	return description;
}