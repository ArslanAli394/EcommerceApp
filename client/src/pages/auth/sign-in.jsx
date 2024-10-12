import React from 'react';
import { Link } from 'react-router-dom';
//components
import FormInput from '../../components/form-input/from-input';
import CustomButton from '../../components/custom-button/cutom-button';
//auth 
// import { auth,signInWithGoogle } from '../../firebase/firebase.util';


class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email:"",
            password: ""
        };
    }
    handleChange = event =>{
        const { name, value } = event.target;
        this.setState({ 
            [name]: value
        })
    }
    handleSubmit = async event =>{
        event.preventDefault();
        const { email, password } = this.state;
        // try{
        //   await auth.signInWithEmailAndPassword( email, password );
          this.setState({ email:"", password: ""})
        // }catch(err){
        //   console.log(err.message)
        // }
    }
    render() { 
        return(
            <div class="flex items-center justify-center">
  <div class="max-w-md w-full">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
    </div>
    <form class="mt-8 space-y-6" action="#" method="POST" onSubmit={this.handleSubmit}>
      <input type="hidden" name="remember" value="true"/>
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" class="sr-only">Email address</label>
          <FormInput 
            id="email-address" 
            name="email" 
            value={this.state.email} 
            onChange={this.handleChange} 
            type="email" 
            required 
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
            placeholder="Email address"
           />
        </div>
        <div>
          <label htmlFor="password" class="sr-only">Password</label>
          <FormInput 
            id="password" 
            name="password" 
            value={this.state.password} 
            onChange={this.handleChange} 
            type="password" 
            required 
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
            placeholder="Password"
           />
        </div>
      </div>
      <div>
        <Link to='/signUp'>
        <p class='text-purple-600 cursor-pointer'>
          Don't have any account then click here to sign up.
        </p>
        </Link>
      </div>  

      <div>
        <CustomButton type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Sign in
        </CustomButton>
      </div>
      <div>
        <CustomButton 
          // onClick={signInWithGoogle} 
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Sign in with Google
        </CustomButton>
      </div>
    </form>
  </div>
</div>)
    }
}
export default SignIn;