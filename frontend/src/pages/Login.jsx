import {useState, useEffect} from 'react'
import { FaSignInAlt }  from 'react-icons/fa'

function Login() {
  /**since we have to rerender the form time and again use gonna use
   * useState what use state basically does is it re renders the react component 
   * while we input the text in form field it will not update because there is no state change 
   * the initial state of form has all blank in it  because the react rendered the component only once 
   * and since there is no state change it won't get re-rendered, the **/ 
const [formData, setFormData] = useState({
  email : '',
  password: '',
 
})
const {email, password} = formData //destruct the data
const onChange =(e)=>{
 setFormData ((prevState)=>({
    ...prevState,
    [e.target.name]: e.target.value
 })) 
} 

const onSubmit=(e)=>{
 e.preventDefault() //prevents from its default action like no submiting form when click submit
}

  return (
    <>
    <section className='heading'>
      <h1>
        <FaSignInAlt/>Login 
      </h1>
      <p>Please Create an account </p>
    </section>
    
    <section>
      <form onSubmit={onSubmit}>
 
        <div className="form-group">
        <input 
          type="email"  
          className='form-control' 
          id='email'  
          value={email} 
          placeholder="Enter your email "
          onChange={onChange}
        />
        </div>

        <div className="form-group">
        <input 
          type="password"  
          className='form-control' 
          id='password'  
          value={password} 
          placeholder="Enter your password "
          onChange={onChange}
        />
        </div>


        <div className="forom-group">
          <button type='submit' className='btn btn-block'>Submit</button>
        </div>
      </form>
    </section>
    </>
  )
}

export default Login