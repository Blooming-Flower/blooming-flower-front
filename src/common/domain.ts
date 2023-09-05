/**
 * <PRE>
 * 1. Name : PATH
 * 2. Comment   : 도메인 주소 ENUM 관리
 * 3. Author    : JSH
 * <PRE>
 */
export const enum PATH {
	//메인
	// MAIN = '/main',
	MAIN = '/',

	LOGIN = '/login',
	ERROR = '/*',

	//메뉴
	QUESTION0 = '/question/passageMng',
	QUESTION1 = '/question/passageCrt',
	QUESTION2 = '/question/questionCrt',
	QUESTION3 = '/question/examCrt',
	QUESTION4 = '/question/examView',
	QUESTION5 = '/question/examMng',

	// MENU1SUB0 = '/',
	// MENU1SUB1 = '/',
	//
	// MENU2SUB0 = '/',
	// MENU2SUB1 = '/',
	//
	// MENU3SUB0 = '/',
	// MENU3SUB1 = '/',
	// MENU3SUB2 = '/',
	//
	// MENU4SUB0 = '/',
	// MENU4SUB1 = '/',
	// MENU4SUB2 = '/',
	//
	// MENU5SUB0 = '/',

	STATISTIC = '/statistic'
}

/* ******************* 메뉴 리스트 ******************* */
//메뉴
export const enum MENU {
	QUESTION, //문제관련메뉴(활성화)
	MENU1, //두번째메뉴
	MENU2, //세번째메뉴
	MENU3, //네번째메뉴
	MENU4, //다섯번째메뉴
	MENU5, //여섯번째메뉴
	MENU6, //일곱번째메뉴
	BLANK //여덟번째메뉴
}

//문제관련 메뉴
export const enum QUESTION {
	PASSAGECRT, //지문저장
	PASSAGEMNG, //지문관리
	QUESTIONCRT, //문제출제
	EXAMCRT, //시험지제작
	EXAMVIEW, //시험지보기
	EXAMMNG //시험지관리
}
export const enum MENU1 {
	SUB0, //첫번째서브메뉴
	SUB1 //두번째서브메뉴
}
export const enum MENU2 {
	SUB0, //첫번째서브메뉴
	SUB1, //두번째서브메뉴
	SUB2 //세번째서브메뉴
}
export const enum MENU3 {
	SUB0, //첫번째서브메뉴
	SUB1, //두번째서브메뉴
	SUB2 //세번째서브메뉴
}
export const enum MENU4 {
	SUB0, //첫번째서브메뉴
	SUB1 //두번째서브메뉴
}
export const enum MENU5 {
	SUB0, //첫번째서브메뉴
	SUB1 //두번째서브메뉴
}
export const enum MENU_NAME {}
