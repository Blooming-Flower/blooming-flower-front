import logo from '@images/common/btn-close.png'
import { Hidden, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import useClasses from '@utils/useClasses'

const Footer = () => {
	const [value, setValue] = useState(0)
	const defaultTab = {
		fontSize: '1rem',
		outline: 'none',
		fontFamily: 'Noto Sans KR',
		padding: '0 2rem 0 2rem',
		display: 'block',
		width: '100%'
	}
	const useStyles = (theme: any) => ({
		customStyleOnTab: Object.assign({ color: '#999999' }, defaultTab)
	})

	const classes = useClasses(useStyles)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return (
		<footer>
			<div id="footerLogo">
				<Hidden smUp>
					<SubFooter size="mobile" />
				</Hidden>
				<Hidden smDown lgUp>
					<SubFooter size="tablet" />
				</Hidden>
				<Hidden lgDown>
					<SubFooter size="pc" />
				</Hidden>
			</div>
		</footer>
	)
}

const SubFooter = (props: { size: string }) => {
	return (
		<div className={props.size}>
			<img src={logo} />
			<hr className="footLine" />
			<ul>
				<li>경기도 화성시 동탄대로시범길, 1119호</li>
				<li>Tel : 00-0000-0000 | Fax : 00-0000-0000 | E-mail : jsh9512201@gmail.com</li>
				<li>Copyright (c) 승훈 ALL RIGHTS RESERVED.</li>
			</ul>
		</div>
	)
}

export default Footer
