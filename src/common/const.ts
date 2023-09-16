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
	SERVER_URL: HTTP + SERVER
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

export const PASSAGETYPE = [
	'교과서',
	'모의고사',
	'EBS',
	'부교재',
	'외부지문'
]

export const TEXTBOOK = {
	'강' : ['1과','2과','3과','4과','5과','6과','7과','8과','9과','10과'],
	'번호' :  ['01',',02','03','04','05','06','07','08']
}
export const UNIT = {
	'P1' : ['1과','2과','3과','4과','5과','6과','7과','8과','9과','10과'],
	'P2' : [],
	'P3' : ['1강','2강','3강','4강','5강','6강','7강','8강','9강','10강','11강','12강','13강','14강','15강','16강','17강','18강','19강','20강','21강','22강','23강','24강','25강','26강','27강','28강','29강','30강','31강','32강'],
	'P4' : ['1강','2강','3강','4강','5강','6강','7강','8강','9강','10강','11강','12강','13강','14강','15강','16강','17강','18강','19강','20강','21강','22강','23강','24강','Test1','Test2','Test3','Test4','Test5'],
	'P5' : []
}