declare module 'react-image-and-background-image-fade'
declare module '*.doc'

/* ******************* 리듀서관련 ******************* */
type MapAction = ReturnType<typeof mapInstance> //| ReturnType<typeof getMapOBJ>
type MenuAction = ReturnType<typeof setMenuListShow> | ReturnType<typeof setHeaderInfo>
// type HeaderAction = ReturnType<typeof setHeaderInfo>

/* ******************* 공통 ******************* */
type ArrayNumber = number[]
type ArrayString = string[]
type KeyValueType = { [key: string]: string }
type Callback = Function

type TabList = { [key: number]: JSX.Element }
type OptinoType = { value: string; name: string }

type DataDetail = { seq: number; title: string; content: { text: string; img: string }[]; date: string; note: string }

/* ******************* transition ******************* */
type FadeTransition = { threshold: number; children: React.ReactElement; time?: number }
type Transition = {
	threshold: number
	direction: 'left' | 'right' | 'up' | 'down' | undefined
	children: React.ReactElement
	isEndListener?: boolean
	callFunc?: any
	time?: number
}

type popupProps = {
	display : number,
	callPassage : boolean,
	check : boolean,
	open : boolean,
	type : string,
	subType : string,
	pastYn : boolean,
	subPastYn : boolean,
	title : string,
	subTitle : string,
	content : string,
	subContent : string
}
type questionSet = {
	passageName:string,
	passageYear:string,
	questionInfo:questionInfo[]
}
type questionInfo = {
	question:question[],
	questionCode:string,
	questionContent:string,
	questionTitle:string
}
type question = {
	answer:[],
	choose:chooseList[],
	pastYn:boolean,
	questionId:number,
	questionSubTitle:string,
	questionType:string,
	subBox:string
}
type chooseList = {
	seq:number,
	content:string
}
type ExamBase = {
	count:number,
	page:number,
	passageId:number,
	passageName:string,
	passageNumber:string,
	passageType:string,
	passageUnit:string,
	passageYear:string,
	questionIds:[],
	questionInfo:questionInfo[]
}[]

type ExamProps = {
	rowData:ExamBase,
	examTitle:string,
	header:string,
	leftBottom:string,
	rightBottom:string,
	pdfRef:any
}
type setPopupProps = Dispatch<SetStateAction<{ display: number; callPassage: boolean; check: boolean; open: boolean; type: string; subType: string; pastYn: boolean; subPastYn: boolean; title: string; subTitle: string; content: string; subContent: string; }>>