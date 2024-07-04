//正则校验的正则表达式，这里注意正则表达式中的‘\’要使用‘\\’转义
const patterns = {
    "name": "^[a-zA-Z_][0-9a-zA-Z_]{0,}$",
    "phone": "^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$",
    "tel": "^(0\\d{2,3}-\\d{7,8}(-\\d{1,6})?)$",
    "email": "^[\\w\\.-]+@[a-zA-Z\\d\\.-]+\\.[a-zA-Z]{2,}$",
    "pwd": "^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\\(\\)])+$)([^(0-9a-zA-Z)]|[\\(\\)]|[a-z]|[A-Z]|[0-9]){8,}$",
    "ip": "^(?=(\\b|\\D))(((\\d{1,2})|(1\\d{1,2})|(2[0-4]\\d)|(25[0-5]))\\.){3}((\\d{1,2})|(1\\d{1,2})|(2[0-4]\\d)|(25[0-5]))(?=(\\b|\\D))$",
    "IDCard": "(^\\d{15}$)|(^\\d{17}([0-9]|X)$)",
    "url": "^https?://([\\w-]+\\.)+[\\w-]+(/[\\w-./?%&=]*)?$"
}

//对应正则表达式的提示信息
const patternMsg = {
    "name": "请以字母、下划线开头并包括数字、字母、下划线组成",
    "phone": "手机号码格式不正确",
    "tel": "电话号码格式不正确",
    "email": "邮箱地址不正确",
    "pwd": "密码至少由8位包含字母、数字、特殊字符两种组合",
    "ip": "IP地址不正确",
    "IDCard": "身份证号码不正确",
    "url": "链接格式不正确"
}


const pattern = (name, para = 'g', type = 'blur') => {
    return {
        pattern: new RegExp(patterns[name], para),
        message: patternMsg[name],
        trigger: type
    }
}

export default pattern;
