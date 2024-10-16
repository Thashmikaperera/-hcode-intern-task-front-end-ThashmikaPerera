import React, {useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import {UserService} from '../../service/UserService.tsx';
import {UserModel} from '../../models/UserModel.tsx'

const SignUp = () => {

  const [user, setUser] = useState<UserModel>({
    id: '',
    username: '',
    password: '',
    email:''
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setUser(
      {
        id:'0',
        username:name,
        password:password,
        email:email,
      }
    );
  },[name,email,password]);

  // const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit =async  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages

    // Validate email
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate password
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Implement sign-up logic here (e.g., call an API)
    console.log('Name:', name, 'Email:', email, 'Password:', password);
    console.log(user);

    try{
      let usermodelPromise=await UserService.saveUser(user);
      console.log(usermodelPromise);
    }catch(error){
      console.error('Failed to save user:', error);
    }

    
    // Redirect after successful sign-up
    // navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md">
        <form className="bg-white border shadow border-gray-300 rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <h2 className="text-center text-3xl font-bold mb-6 text-primaryColor">Sign Up</h2>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="border-gray-300 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-[#007bff]"
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
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
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className="border-gray-300 border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-1 focus:ring-[#007bff]"
              id="confirm-password"
              type="password"
              placeholder="Enter confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Sign Up Button */}
          <div className="flex items-center justify-center">
            <button
              className="bg-primaryColor hover:bg-hoverColor text-white w-full py-2 px-3 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              If you have an account?{' '}
              <a href="/login" className="text-primaryColor hover:text-hoverColor underline">
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;