import { Fade } from '@mui/material'
import { getViewSize } from '@utils/functions'

const FadeImg = (props: IFadeImg) => {
	const time: number = props.delay || 1500
	let type: string
	let style: {}
	if (!props.isContent) {
		style = { width: '100%', height: '350px' }
		if (getViewSize() == 'lg') {
			type = props.pc
		} else {
			type = props.mobile!
		}
	} else {
		type = props.pc
		style = { width: '100%' }
	}

	return (
		<div id={props.id}>
			<Fade in={true} timeout={time}>
				<img src={type!} style={style!} alt="서브메뉴상단" />
			</Fade>
		</div>
	)
}
export default FadeImg
