import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navabar'

function App() {

  return (

<BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          
        </Routes>
        <Routes>
          {/* Rutas del estudiante */}
          {/* <Route path="/" element={<PrivateRoute allowedRoles={['students']} />}>
            <Route index element={<StudentDashboard />} />
          </Route> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
