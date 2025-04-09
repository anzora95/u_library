import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import StudentsDashboard from './pages/students/StudentsDashboard'
import LibrarianDashboard from './pages/librarian/LibrarianDashboard'
import BookList from './pages/books/BookList'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navabar'
import PrivateRoute from './utils/PrivateRouter'

function App() {

  return (

<BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
        </Routes>
        <Routes>
          <Route path="/librarian" element={<PrivateRoute allowedRoles={['librarian']} />}>
            <Route index element={<LibrarianDashboard />} />
          </Route>

                    {/* Rutas de estudiante */}
           <Route path="/student" element={<PrivateRoute allowedRoles={['student']} />}>
            <Route index element={<StudentsDashboard />} />
            <Route path="booklist" element={<BookList />} />
            {/* <Route path="my-loans" element={<LoansPage />} /> */}
          </Route>

          {/* <Route path='/dashboard-student' element={<StudentsDashboard />} /> */}
          {/* <Route path='/booklist' element={<BookList />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
