import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Category from './pages/Category';
import PrivateRoute from './components/PrivateRoute';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import Contact from './pages/Contact';
import EditListing from './pages/EditListing';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore/>}/>
          <Route path='/offers' element={<Offers/>}/>
          <Route path='/category/:categoryName' element={<Category/>}/>{/*categoryName defined by alt in img in Explore*/ }
          <Route path='/profile' element={<PrivateRoute/>}> {/*Because we can't go to the profile if there is no user */}
            <Route path='/profile' element={<Profile/>}/>{/*this is the outlet in PrivateRoute is the child*/}
          </Route>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path ='/create-listing' element={<CreateListing/>}/>
          <Route path ='/edit-lisitng/:listingId' element={<EditListing/>}/>
          <Route path='/category/:categoryName/:listingId' element={<Listing/>}/>
          <Route path='/contact/:landlordId' element={<Contact/>}/>
        </Routes>
          <Navbar/> 
      </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
