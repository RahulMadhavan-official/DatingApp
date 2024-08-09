import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./usersignup.css";


const UserSignup =()=>{
  const navigate = useNavigate()
  const [user,setUser]=useState({
    name : '',
    contactNumber: '',
    Password : " ",
    email: ' ',
  })
  const onClick =async()=>{
    const response = await axios.post('http://localhost:3000/users/signup',user)
    navigate('/')
  }
  const onChange=(e,key)=>{
  if(key=='name') setUser({...user,name: e.target.value})
  else if(key=='contactNumber') setUser({...user,contactNumber:parseInt(e.target.value)})
 else if(key=='email')setUser({...user,email:e.target.value})
else if(key=='password')setUser({...user,password:e.target.value})
  }

    return(
        <div>
         <div className="signup-form">
           <div className="heading">
            <h1>SignUp</h1>
           </div>
           <div className='username'>
             <input placeholder='Name' onChange={(e)=>onChange(e,'name')}/>
             <div className="contact-number">
              <p className="country-code">+91</p>
             <input placeholder='number' type="text" onChange={(e)=>onChange(e,'contactNumber')} />
             </div>
            
             <input placeholder='E-mail' onChange={(e)=>onChange(e,'email')}/>
             <input placeholder='password' type="password" onChange={(e)=>onChange(e,'password')}/>
             <input placeholder='confirm password' type="password"/>
             <input placeholder='OTP' />
             <button className={onClick}>signIn Now</button>
            </div>
         </div>
         </div>
        
    )
}
export default UserSignup;