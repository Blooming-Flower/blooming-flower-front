import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { ALERT as TYPE } from '@common/const'

const swal = withReactContent(Swal)
const colors = {
	confirmButtonColor: '#3085d6',
	cancelButtonColor: '#d33'
}
/**
 * <PRE>
 * 1. Name : defaultAlert
 * 2. Comment   : 기본 alert창
 * 3. Author    : JSH
 * <PRE>
 */
const defaultAlert = (text: string, title?: string) => {
	title !== undefined ? swal.fire({ title: title, html: text, ...colors }) : swal.fire({ text, ...colors })
}

/**
 * <PRE>
 * 1. Name : infoAlert
 * 2. Comment   : 정보 아이콘표시
 * 3. Author    : JSH
 * <PRE>
 */
const infoAlert = (prop: IAlterProps) => {
	prop.title !== undefined
		? swal.fire({ title: prop.title, html: prop.text, icon: 'info', ...colors })
		: swal.fire({ html: prop.text, icon: 'info', ...colors })
}

/**
 * <PRE>
 * 1. Name : successAlert
 * 2. Comment   : 성공 아이콘표시
 * 3. Author    : JSH
 * <PRE>
 */
const successAlert = (prop: IAlterProps) => {
	prop.title !== undefined
		? swal.fire({ title: prop.title, html: prop.text, icon: 'success', ...colors })
		: swal.fire({ html: prop.text, icon: 'success', ...colors })
}

/**
 * <PRE>
 * 1. Name : warningAlert
 * 2. Comment   : 경고 아이콘표시
 * 3. Author    : JSH
 * <PRE>
 */
const warningAlert = (prop: IAlterProps) => {
	prop.title !== undefined
		? swal.fire({ title: prop.title, html: prop.text, icon: 'warning', ...colors })
		: swal.fire({ html: prop.text, icon: 'warning', ...colors })
}

/**
 * <PRE>
 * 1. Name : confirmAlert
 * 2. Comment   : 컨펌창 확인|취소
 * 3. Author    : JSH
 * <PRE>
 */
const confirmAlert = (prop: IAlterProps) => {
	swal
		.fire({
			title: prop.text,
			showCancelButton: true,
			icon: 'question',
			confirmButtonText: prop.confirmText,
			cancelButtonText: prop.dismissText || '취소',
			...colors
		})
		.then(res => {
			if (res.isConfirmed) {
				//confirm 버튼을 눌렀다면
				if (prop.confirmCall!) {
					prop.confirmCall!()
				}
			} else if (res.isDismissed) {
				//cancel 버튼을 눌렀다면
				if (prop.dismissCall!) {
					prop.dismissCall!()
				}
			}
		})
}

/**
 * <PRE>
 * 1. Name : confirmAlert2
 * 2. Comment   : 컨펌창 확인|저장|취소
 * 3. Author    : JSH
 * <PRE>
 */
const confirmAlert2 = (prop: IAlterProps) => {
	swal
		.fire({
			title: prop.text,
			// icon: 'question',
			showDenyButton: true,
			showCancelButton: true,
			denyButtonText: prop.denyText,
			confirmButtonText: prop.confirmText,
			cancelButtonText: prop.dismissText || '취소',
			...colors
		})
		.then(res => {
			if (res.isConfirmed) {
				//confirm 버튼을 눌렀다면
				prop.confirmCall!()
			} else if (res.isDenied) {
				//deny 버튼을 눌럿다면
				prop.denyCall!()
			} else if (res.isDismissed) {
				//cancel 버튼을 눌렀다면
				prop.dismissCall!()
			}
		})
}

/**
 * <PRE>
 * 1. Name : alert
 * 2. Comment   : 타입별 alert창 설정
 * 3. Author    : JSH
 * <PRE>
 */
// export const alert = (prop: IAlterProps) => {
export const alert = {
	open: (text: string, title?: string) => {
		defaultAlert(text, title)
	},
	icon: (prop: IAlterProps) => {
		switch (prop.type) {
			case TYPE.INFO:
				infoAlert(prop)
				break
			case TYPE.SUCCESS:
				successAlert(prop)
				break
			case TYPE.WARNING:
				warningAlert(prop)
				break
		}
	},
	confirm: (prop: IAlterProps) => {
		switch (prop.type) {
			case TYPE.CONFIRM:
				confirmAlert(prop)
				break
			case TYPE.CONFIRM_3B:
				confirmAlert2(prop)
				break
		}
	}
}
