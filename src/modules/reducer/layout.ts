// 레이아웃 관련 액션타입
const popupOpen = 'REDUCER_LAYOUT/POPUP_OPEN' as const
const popupClose = 'REDUCER_LAYOUT/POPUP_CLOSE' as const
const header = 'REDUCER_LAYOUT/HEADER_INFO' as const

const logIn = 'REDUCER_LAYOUT/LOGIN_IN' as const
const logOut = 'REDUCER_LAYOUT/LOGIN_OUT' as const

/**
 * <PRE>
 * 1. Name : setPopupShow
 * 2. Comment   : 팝업관리 액션함수
 * 3. Author    : JSH
 * <PRE>
 */
export const setPopupShow = (val: boolean, children?: React.ReactNode) => ({
	type: val ? popupClose : popupOpen,
	payload: val,
	element: children
})

/**
 * <PRE>
 * 1. Name : setHeaderInfo
 * 2. Comment   : 레이아웃 헤더정보 액션함수
 * 3. Author    : JSH
 * <PRE>
 */
export const setHeaderInfo = (index: number, headers: ArrayString) => ({
	type: header,
	index: index,
	payload: headers
})

// 초기상태 선언
const initState: ILayoutReducer = {
	header: ['Home', '업무소개'],
	index: 0,
	visibility: false,
	isPopup: false,
	isLogin: false,
	children: null
}

/**
 * <PRE>
 * 1. Name : layOutReducer
 * 2. Comment   : 화면관리 리듀서
 * 3. Author    : JSH
 * <PRE>
 */
const layOutReducer = (state: ILayoutReducer = initState, action: MenuAction) => {
	switch (action.type) {
		case popupOpen:
			return {
				...state,
				isPopup: action.payload,
				children: action.element
			}
		case popupClose:
			return {
				...state,
				isPopup: action.payload,
				children: action.element
			}
		case header:
			return {
				...state,
				header: action.payload,
				index: action.index
			}
		default:
			return state
	}
}

export default layOutReducer
