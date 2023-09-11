/* ******************* 환경변수 ******************* */
export const VITE_APP_IMGS =
	import.meta.env.MODE == 'development' ? import.meta.env.VITE_APP_LOCAL_IMGS : import.meta.env.VITE_APP_IMGS

/* ******************* WAS URL ******************* */
const ROOT_URL: string = window.location.host
const HTTP: string = 'http://'
const SERVER: string = '43.201.142.170:29091'
export const SERVER_URL: string = HTTP + SERVER

export const URL = {
	BASE_PROXY: '/common/gis/base.jsp',
	SERVER_URL: ROOT_URL.indexOf('localhost') !== -1 ? HTTP + ROOT_URL : HTTP + SERVER
}

/* ******************* 메시지 박스티입 ******************* */
export const enum ALERT {
	DEFAULT,
	WARNING,
	INFO,
	SUCCESS,
	CONFIRM,
	CONFIRM_3B
}
export const YEAR:string[] = [
	"2023",
	"2024",
	"2025",
	"2026",
	"2027",
	"2028",
	"2029",
	"2030"
]

export const PASSAGETYPE:string[] = [
	'교과서',
	'모의고사',
	'EBS',
	'부교재',
	'외부지문'
]
