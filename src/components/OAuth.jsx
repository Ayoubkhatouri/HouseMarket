import React from 'react'
import {useLocation , useNavigate} from 'react-router-dom'
import {getAuth,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
import {doc,setDoc,getDoc,serverTimestamp} from 'firebase/firestore'
import {db} from '../firbase.config'
import {toast} from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'


function OAuth() {
    const navigate =useNavigate()
    const location =useLocation()

    const onGoogleClick=async()=>{
        try {
            const auth=getAuth()
            const provider=new GoogleAuthProvider()
            const result=await signInWithPopup(auth,provider)
            const user=result.user

            const docRef=doc( db,'users',user.uid)
            const docSnap =await getDoc(docRef)

            //check if the user exist in firbase or not (if it thas not we will create one)
            if(!docSnap.exists()){
                await setDoc(doc(db,'users',user.uid),
                {                                       //the second argument in setDoc is the 
                    name:user.displayName,                   //data that we wanna add to database
                    email:user.email,
                    timestamp:serverTimestamp()
                })                                        
            }
            navigate('/')
        } catch (error) {
            toast.error('Could not Authorise with Google')
        }
    }

  return (
    <div className='socialLogin'>
        <p>Sign {location.pathname==='/sign-up' ? 'up' : 'in'} with </p>
         <button className="socialIconDiv" onClick={onGoogleClick}>
            <img className='socialIconImg' src={googleIcon} alt="google" />
         </button>
    </div>
  )
}

export default OAuth