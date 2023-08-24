import { setPopupShow } from '@modules/reducer/layout'
import { Box } from '@mui/material'
import CustomModal from '@mui/material/Modal'
import { useDispatch } from 'react-redux'
import { CloseButton } from '../button'

const defaultStyle = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	border: '2px solid #F00',
	boxShadow: 24
}
const styles: {}[] = [
	Object.assign(
		{
			// width: 400,
			p: 4
		},
		defaultStyle
	),
	Object.assign(
		{
			width: 800,
			p: 4
		},
		defaultStyle
	)
]

const Popup = (props: IPopupProps) => {
	const dispatch = useDispatch()

	const onPopupClose = () => {
		dispatch(setPopupShow(false))
	}

	return (
		<>
			<CustomModal open={props.open} onClick={onPopupClose}>
				<Box sx={styles[props.styleType || 0]}>
					<CloseButton id="btnPopupClose" onClick={onPopupClose} />
					{props.children}
				</Box>
			</CustomModal>
		</>
	)
}

export default Popup
