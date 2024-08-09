import './signup.css';
import { icons } from 'antd/es/image/PreviewGroup';
import { useNavigate } from 'react-router-dom';
import { FontSizeOutlined, GoogleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect,useState } from 'react';
import Password from 'antd/es/input/Password';




const SignIn =()=>{
    const navigate = useNavigate();
    const [user,setUser]=useState({
      contactNumber: '9526000801',
      Password : "rahul@123 "
    })

    const newUser =async()=>{
      navigate('/signup')
    }
    const login = async()=>{
      const response = await axios.post('http://localhost:3000/users/login')
      console.log(response.data)
      navigate('/signup')

      console.log(user)
    }
  useEffect(()=>{
    login()
  },[])
    return(
        <div>
          <div className='signup'>
            <div className='heading'>
                <h1>LOGIN</h1>
            </div>
            <div className='username'>
             <input placeholder='contact number'/>
             <input placeholder='password'/>
            </div>
            <div className='login'>
                <button onClick={login}>LOGIN</button>
            </div>
            <div className='google-sign'>
                <p>-or-</p>
                 <button> <GoogleOutlined className='style-google' style={{fontSize:'30px'}}/> SignIn With Google </button>
                
                <p>New User? <button onClick={newUser}>SignUp</button></p>
            
            </div>
          </div>
        </div>
    )
}
export default SignIn;
