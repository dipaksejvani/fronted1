import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError('');
    
    try {
      // Make a POST request to the backend login endpoint
      // Replace with your actual backend URL
      const backendUrl = 'http://localhost:3200'; // Change this to your backend URL and port
      const response = await fetch(`${backendUrl}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
      });
      
      // Parse the JSON response first, even if response is not ok
      // This allows us to get detailed error messages from the backend
      const contentType = response.headers.get('content-type');
      let result;
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      }
      
      if (!response.ok) {
        // Handle different error cases with specific messages
        if (result && result.message) {
          // Look for specific error messages from backend
          if (result.message.toLowerCase().includes('user not found') || 
              result.message.toLowerCase().includes('no user') ||
              result.message.toLowerCase().includes('email not registered')) {
            throw new Error('User not found. Please check your email or register a new account.');
          } else if (result.message.toLowerCase().includes('password') || 
                    result.message.toLowerCase().includes('credentials')) {
            throw new Error('Incorrect password. Please try again.');
          } else {
            // Use the error message from the backend
            throw new Error(result.message);
          }
        }
        
        // If no specific message, fall back to status code messages
        if (response.status === 404) {
          throw new Error('User not found. Please check your email or register a new account.');
        } else if (response.status === 401) {
          throw new Error('Incorrect password. Please try again.');
        } else {
          throw new Error(`Login failed: ${response.status} ${response.statusText}`);
        }
      }
      
      // If we reached here, the login was successful
      if (!result) {
        throw new Error('Empty response received from server');
      }
      
      console.log('Response from server:', result);
      
      // Store user data in localStorage for session management
      // Handle different response structures that might come from the backend
      if (result.data) {
        // Based on the actual response structure we saw in console
        localStorage.setItem("id", result.data._id);
        localStorage.setItem("role", result.data.roleId?.name || 'user');
        localStorage.setItem("email", result.data.email);
      } else if (result.user) {
        // Alternative structure with user object
        localStorage.setItem("id", result.user.id);
        localStorage.setItem("role", result.user.role);
        localStorage.setItem("email", result.user.email || data.email);
      } else if (result.id) {
        // Alternative structure with direct user data
        localStorage.setItem("id", result.id);
        localStorage.setItem("role", result.role || 'user');
        localStorage.setItem("email", result.email || data.email);
      } else {
        // If we can't find user data
        throw new Error('User data not found in response');
      }
      
      // If token is provided by backend, store it
      if (result.token) {
        localStorage.setItem("token", result.token);
      } else if (result.data?.token) {
        localStorage.setItem("token", result.data.token);
      }
      
      // Reset form and navigate
      reset();
      navigate('/provider/addevent');
    } catch (error) {
      setAuthError(error.message);
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      zIndex: 1000
    }}>
      <div style={{
        width: '100%',
        maxWidth: '960px',
        margin: '0 auto',
        display: 'flex',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#fff'
      }}>
        {/* Left side - Form */}
        <div style={{
          flex: 1,
          padding: '40px'
        }}>
          <h2 style={{
            fontSize: '24px',
            color: '#f05537',
            fontWeight: 'bold',
            marginBottom: '30px'
          }}>BookMySpot</h2>
          
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '8px'
          }}>Welcome Back</h1>
          
          <p style={{
            color: '#6c757d',
            marginBottom: '30px'
          }}>Login to your account to continue</p>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            {authError && (
              <div style={{
                padding: '10px',
                backgroundColor: '#ffebee',
                color: '#d32f2f',
                borderRadius: '4px',
                marginBottom: '20px',
                fontSize: '14px'
              }}>
                {authError}
              </div>
            )}
            
            <div style={{marginBottom: '20px'}}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px'
              }}>Email Address</label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                placeholder="name@example.com"
                aria-label="Email Address" // Added for accessibility
                style={{
                  width: '100%',
                  padding: '10px',
                  border: errors.email ? '1px solid red' : '1px solid #ddd', // Highlight error
                  borderRadius: '4px',
                  fontSize: '14px',
                  backgroundColor: '#f8f9fa',
                  color: '#333'
                }}
              />
              {errors.email && <p style={{color: 'red', fontSize: '12px'}}>{errors.email.message}</p>}
            </div>
            
            <div style={{marginBottom: '20px'}}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px'
              }}>Password</label>
              <div style={{position: 'relative'}}>
                <input
                  {...register('password', { required: 'Password is required' })}
                  type={showPassword ? "text" : "password"}
                  placeholder="enter your password"
                  aria-label="Password" // Added for accessibility
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: errors.password ? '1px solid red' : '1px solid #ddd', // Highlight error
                    borderRadius: '4px',
                    fontSize: '14px',
                    backgroundColor: '#f8f9fa',
                    color: '#333'
                  }}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <FaEyeSlash style={{ color: '#333' }} /> : <FaEye style={{ color: '#333' }} />}
                  </button>
              </div>
              {errors.password && <p style={{color: 'red', fontSize: '12px'}}>{errors.password.message}</p>}
            </div>
            <div style={{
              textAlign: 'right',
              marginBottom: '20px'
            }}>
              <Link to="/forgot-password" style={{
                color: '#f05537',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>Forgot Password?</Link>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#f05537',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '20px'
              }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            {isLoading && <p style={{color: '#6c757d', fontSize: '14px'}}>Please wait...</p>} 
            <div style={{
              textAlign: 'center',
              fontSize: '14px',
              color: '#6c757d'
            }}>
              Don't have an account? <Link to="/signup" style={{color: '#f05537', textDecoration: 'none', fontWeight: 'bold'}}>Sign Up</Link>
            </div>
          </form>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#6c757d',
              textAlign: 'center'
            }}>Having trouble logging in? <Link to="/help" style={{color: '#f05537', textDecoration: 'none', fontWeight: 'bold'}}>Get Help</Link></p>
          </div>
        </div>
        
        {/* Right side - Image */}
        <div style={{
          flex: 1,
          backgroundImage: 'url(https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px'
          }}>
            <div style={{
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                marginBottom: '20px'
              }}>Welcome Back</h2>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6'
              }}>Continue your journey with BookMySpot and discover amazing venues.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
