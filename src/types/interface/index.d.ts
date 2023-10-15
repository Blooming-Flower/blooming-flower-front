/* ******************* 라우터관련 ******************* */
interface IPrivateRouteProps {
	children?: ReactElement // Router.tsx에서 PrivateRoute가 감싸고 있는 Componet Element
	authentication: boolean
}

interface ILayoutReducer {
	index?: number
	visibility?: boolean
	header?: ArrayString
	isPopup: boolean
	isLogin: boolean
	children: React.ReactNode
}
// interface IHeaderReducer {
// 	header: ArrayString
// }

interface IMapReducer {
	map: CMap | undefined
}

interface ISize {
	w: number
	h: number
}

/* ******************* COMPONENTS ******************* */
interface ITabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

interface IPopupProps {
	id: string
	open: boolean
	children?: React.ReactNode
	styleType?: number
}

interface IOptions {
	from: number
	to: number
}
interface ExamProps {rowData:{ id:string, passageYear:string,passageName:string,passageUnit:string,passageNumber:string }[],examTitle:string,header:string,leftBottom:string,rightBottom:string}
/* ******************* UTILS ******************* */
interface IAlterProps {
	type: number
	text: string
	title?: string
	confirmText?: string
	confirmCall?: Callback
	denyText?: string
	denyCall?: Callback
	dismissText?: string
	dismissCall?: Callback
}

/* ******************* 게시판 상세페이지 ******************* */
interface IDetailTableProps {
	title: string
	subMenu: string
	date: string
	// imgs: string[]
	content?: { text: string; img: string }[]
	preTitle: string
	nextTitle: string
	path: string
	menu: string
	recruit?: {
		text: {
			recruit1: string[]
			recruit2: string[]
			recruit3: string[]
		}
		img: string
		startDate: string
		endDate: string
	}
}
interface IDetailTableInfo {
	menuName: string
	path: string
	dataList: DataDetail[] | RecruitDetail[]
}

/* ******************* ///////////////// ******************* */
interface HeaderProps {
	window?: () => Window
	children: React.ReactElement
}

interface IFadeImg {
	pc: string
	id?: string
	delay?: number
	mobile?: string
	isContent: boolean
}
