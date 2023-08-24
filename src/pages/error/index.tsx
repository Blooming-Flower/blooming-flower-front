import { Link } from 'react-router-dom'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'

const Error = () => {
	return (
		<div style={{ textAlign: 'center' }}>
			<div className="errorWrap" style={{ paddingTop: '200px' }}>
				<ReportProblemIcon color="primary" style={{ fontSize: '10rem' }} />
				<p style={{ fontSize: '3rem' }}>
					<strong>
						죄송합니다.
						<br />
						요청하신 페이지를 찾을 수 없습니다.
					</strong>
					<br />
					<br />
				</p>
				<p style={{ fontSize: '1.2rem' }}>
					페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
					<br />
					입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
					<br />
					감사합니다.
				</p>
				<div style={{ paddingTop: '100px' }}>
					<Link to="/">
						<button type="button" className="btn" style={{ width: '150px', height: '50px' }}>
							홈으로 가기
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Error
