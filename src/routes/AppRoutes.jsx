import { Routes, Route } from 'react-router-dom'
import Layout from '../Components/common/Layout/Layout'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Contact from '../pages/Contact/Contact'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Dashboard from '../pages/Dashboard/Dashboard'
import Profile from '../pages/Profile/Profile'
import NotFound from '../pages/NotFound/NotFound'
import Doctor from '../pages/doctor/Doctor'
import ViewAppointment from '../pages/doctor/view/ViewAppointment'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="doctors" element={<Doctor />} />
        <Route path="doctors/:id/appointments" element={<ViewAppointment />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        {/* Private Routes */}
        <Route path="dashboard" element={
        //   <PrivateRoute>
            <Dashboard />
        //   </PrivateRoute>
        } />
        <Route path="profile" element={
        //   <PrivateRoute>
            <Profile />
        //   </PrivateRoute>
        } />
        
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes