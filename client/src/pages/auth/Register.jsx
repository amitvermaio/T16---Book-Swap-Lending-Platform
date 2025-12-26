import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import axios from '../../config/axiosconfig';
import { loaduser } from '../../store/features/userSlice';
import { useDispatch } from 'react-redux';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const SubmitHandler = async ({ name, email, password }) => {
    try { 
      const { data } = await axios.post(`/auth/register`, { name, email, password });
      dispatch(loaduser(data.user));
      localStorage.setItem('BookSwap_Token', data.token);
      toast.success('Account Created Successfully!');
    } catch (error) {
      console.log(error);
      const err = error.response?.data?.message;
      toast.error( err ? err : 'Registration failed.' );
    }
  }

  const handleGoogleLogin = () => {
    toast.loading("Redirecting to Google...");
    console.log("Google Login Clicked");
  };

  return (
    <div className='min-h-screen w-full flex justify-center items-center bg-gray-50 py-10 px-4'>
      
      <div className='w-full max-w-sm bg-white p-6 rounded-xl shadow-lg border border-gray-100'>
        
        <div className="flex flex-col items-center mb-5">
          <h2 className='text-xl font-bold text-black'>Create Account</h2>
          <p className='text-gray-500 text-xs mt-1'>Join BookSwap today</p>
        </div>

        <form onSubmit={handleSubmit(SubmitHandler)} className='flex flex-col gap-4'>
          
          {/* Name Field */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-black">Full Name</label>
            <input 
              {...register('name')} 
              type="text" 
              placeholder='John Doe' 
              // Reduced padding (py-2)
              className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-black text-sm'
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-black">Email Address</label>
            <input 
              {...register('email')} 
              type="email" 
              placeholder='john@example.com' 
              className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-black text-sm'
            />
          </div>

          {/* Password Field with Toggle */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-black">Password</label>
            <div className="relative">
              <input 
                {...register('password')} 
                type={showPassword ? "text" : "password"} 
                placeholder='••••••••' 
                className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-black text-sm pr-10'
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className='mt-2 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-lg transition-colors text-sm'
          >
            Register
          </button>

        </form>

        {/* Divider */}
        <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-400">Or continue with</span>
            </div>
        </div>

        {/* Google Login Button - Compact */}
        <button 
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-black font-medium py-2.5 rounded-lg transition-colors text-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </button>

        <div className="mt-5 text-center text-xs text-gray-600">
          Already have an account?{' '}
          <button onClick={() => navigate('/sign-in')} className="text-orange-600 font-bold hover:underline">
            Log in
          </button>
        </div>

      </div>
    </div>
  )
}

export default Register;