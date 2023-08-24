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

