import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import StudentsDashboard from './pages/students/StudentsDashboard'
import LibrarianDashboard from './pages/librarian/LibrarianDashboard'
import BookList from './pages/books/BookList'
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
            
          </Route> */}
          <Route path='/dashboard-student' element={<StudentsDashboard />} />
          <Route path='/dashboard-librarian' element={<LibrarianDashboard />} />
          <Route path='/booklist' element={<BookList />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
