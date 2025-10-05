import { Outlet } from 'react-router-dom'
// import './Layout.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Layout = () => {
  return (
    <div className="">
      <div className="mb-16">
        <Header />
      </div>
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout