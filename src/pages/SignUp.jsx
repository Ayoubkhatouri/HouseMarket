import React from 'react'
import {useState} from 'react'
import {Link , useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {setDoc ,doc ,serverTimestamp} from 'firebase/firestore'
import {db} from '../firbase.config'
import {ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visbilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth';


function SignUp() {
  const [showPassword,setShowPassword]=useState(false)
  const [formData,setFormData]=useState ({
    name:'',
    email:'',
    password:''
  })
  const {name,email,password}=formData
  const navigate=useNavigate()

  const onChange=(e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value
    }))
  }

  const onSubmit=async (e)=>{
    e.preventDefault()

    try {
      const auth=getAuth()
      const userCredentiel=await createUserWithEmailAndPassword (auth,email,password)
      const user =userCredentiel.user
      updateProfile(auth.currentUser,{
        displayName:name 
      })

      const formDataCopy={...formData}
      delete formDataCopy.password
      formDataCopy.timestamp=serverTimestamp()
    //to update database and add user after deleting his password
      await setDoc(doc(db,'users',user.uid),formDataCopy) //the second argument is the name of the collection to add to this

      navigate('/')
    } catch (error) {
      toast.error('Somthing Went Wrong With registration')
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">
            Welcome Back !
          </p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input type="text" className="nameInput" placeholder='Name' id='name' value={name} onChange={onChange}/>
            <input type="email" className="emailInput" placeholder='Email' id='email' value={email} onChange={onChange}/>
            <div className="passwordInputDiv">
            <input type={showPassword?'text':'password'} className="passwordInput" placeholder='Password' id='password' value={password} onChange={onChange}/>
            <img src={visbilityIcon} alt="show password" className='showPassword' onClick={()=>setShowPassword((prevState)=>!prevState)} />
            </div>
            <Link to='/forgot-password' className='forgotPasswordLink'> Forgot Password</Link>
            <div className="signUpBar">
              <p className="signUpText">
                Sign Up
              </p>
              <button className="signInButton">
                <ArrowRightIcon fill='white' width='34px' height='34px'/>
              </button>
            </div>
          </form> 
          <OAuth/>
          <Link to='/sign-in' className='registerLink'>
            Sign in Instead
          </Link>
        </main>
      </div>
    </>
  )
}

export default SignUp