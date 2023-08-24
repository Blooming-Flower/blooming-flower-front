/* ******************* 환경변수 ******************* */
export const VITE_APP_IMGS =
	import.meta.env.MODE == 'development' ? import.meta.env.VITE_APP_LOCAL_IMGS : import.meta.env.VITE_APP_IMGS

/* ******************* WAS URL ******************* */
const ROOT_URL: string = window.location.host
const HTTP: string = 'http://'
const SERVER: string = '211.59.68.82:8080'
const SERVER_URL: string = HTTP + SERVER

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
