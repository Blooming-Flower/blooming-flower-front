import Layout from '@components/layouts/layout'
import { Outlet, Route, Routes } from 'react-router-dom'

const Menu = () => {
    const style = {
        width: '100%',
        height: '500px'
    }
    const idx = location.pathname.indexOf('/', 1)

    return (
        <>
            {idx < 0 ? (
                <Layout>
                    <div style={style}>menu1</div>
                </Layout>
            ) : (
                <Outlet />
            )}
        </>
    )
}

export default Menu