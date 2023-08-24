import HeaderApp from '@components/layouts/header/headerApp'
import { Hidden } from '@mui/material'
import HeaderPc from '@components/layouts/header/headerPc'

const Header = (props: { status: boolean }) => {
	return (
		<>
			<Hidden lgDown>
				<HeaderPc />
			</Hidden>
			<Hidden lgUp>
				<HeaderApp />
			</Hidden>
		</>
	)
}
export default Header
