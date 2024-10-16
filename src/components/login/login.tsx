import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {UserService} from '../../service/UserService.tsx';
import {UserModel} from '../../models/UserModel.tsx'

const Login = () => {


  const [user, setUser] = useState<UserModel>({
    id: '',
    username: '',
    password: '',
    email:''
  });


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setUser(
      {
        id:'',
        username:'',
        password:password,
        email:email,
      }
    );
  },[email,password]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmit = async() => {
    setError(''); // Clear any previous error messages

    // Validate email
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate password
    if (password.length < 2) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    // Implement sign-in logic here if needed (e.g., API call)
    console.log('Email:', email, 'Password:', password);

    try{
      let usermodelPromise=await UserService.loginUser(user);
      console.log(usermodelPromise);

    }catch(error){
      console.error('Failed to save user:', error);
    }
    
    // Navigate to the home page after sign-in
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md">
        <form className="bg-white border shadow border-gray-300 rounded px-8 pt-6 pb-8 mb-4 md:border-hidden md:shadow-hidden">
          <h2 className="text-center text-3xl font-bold mb-6 text-primaryColor">Sign In</h2>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="border-gray-300 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-[#007bff]"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="border-gray-300 border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-1 focus:ring-[#007bff]"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Sign In Button */}
          <div className="flex items-center justify-center">
            <button
              className="bg-primaryColor hover:bg-hoverColor text-white w-full py-2 px-3 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onSubmit}
            >
              Sign In
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <a href="/sign-up" className="text-primaryColor hover:text-hoverColor underline">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;