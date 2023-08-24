import { Navigate, Outlet } from 'react-router-dom'

/**
 * <PRE>
 * 1. Name : PrivateRoute
 * 2. Comment   : 로그인체크 라우터
 * 3. Author    : JSH
 * <PRE>
 */
const PrivateRoute = ({ authentication }: IPrivateRouteProps) => {
	// const isAuthenticated: boolean = true //Boolean(sessionStorage.getItem('isAuthenticated'))

	if (authentication) {
		//로그인이 필요한페이지
		//로그인을 안했을경우 로그인페이지, 했을경우 해당 페이지
		// return !isAuthenticated ? <Navigate to={'/login'} /> : <Outlet />
		// return <Outlet />
	} else {
		//로그인이 필요 없는페이지
		// return <Outlet />
	}
	return <Outlet />
}

export default PrivateRoute
