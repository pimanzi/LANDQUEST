import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Sign.module.css';
import { useState } from 'react';
import Alert from '../components/Alert';

export default function Sign() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [style, setStyle] = useState('');
  const [status, setStatus] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch, // Add watch here
  } = useForm({
    mode: 'onBlur',
  });

  const watchPassword = watch('password');

  const onSubmit = async (data) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch('/api/auth/signup', requestOptions);

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'An error occurred');
      } else {
        navigate('/login');
      }

      const result = await response.json();
      setMessage(result.message);
      setStatus(result.status);

      if (result.status >= 200 && result.status < 300) {
        setStyle('success');
      } else {
        setStyle('danger');
      }
    } catch (err) {
      setMessage(err.message || 'An unknown error occurred');
      setStyle('danger');
    } finally {
      reset();
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setMessage('');
        setStyle('');
        setStatus('');
      }, 10000);
    }
  };

  return (
    <main className={styles.main}>
      {show ? <Alert message={message} style={style} setShow={setShow} /> : ''}
      <div className={styles.sign}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Sign Up</h2>

          <div className={styles.column}>
            <div className={styles.row}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                {...register('firstName', {
                  required: 'First name is required',
                })}
              />
              {errors.firstName && (
                <span className={styles.error}>{errors.firstName.message}</span>
              )}
            </div>
            <div className={styles.row}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                {...register('lastName', { required: 'Last name is required' })}
              />
              {errors.lastName && (
                <span className={styles.error}>{errors.lastName.message}</span>
              )}
            </div>
          </div>

          <div className={styles.row}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username" // Fixed typo here
              {...register('userName', {
                required: 'Username is required', // Fixed typo here
                pattern: {
                  value: /^[a-zA-Z0-9_]{3,16}$/,
                  message: 'Invalid username', // Fixed typo here
                },
              })}
            />
            {errors.userName && (
              <span className={styles.error}>{errors.userName.message}</span> // Fixed typo here
            )}
          </div>
          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>
          <div className={styles.row}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              {...register('number', {
                required: 'Phone number is required',
                pattern: {
                  value: /^(\+?[0-9_\- \(\)]+)?[0-9_\- \(\)]+$/,
                  message:
                    'Invalid phone number. Only numbers, spaces, dashes, underscores',
                },
                maxLength: {
                  value: 30,
                  message: 'Phone number must be 30 characters or less',
                },
              })}
            />
            {errors.number && (
              <span className={styles.error}>{errors.number.message}</span>
            )}
          </div>

          <div className={styles.column}>
            <div className={styles.row}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 9,
                    message: 'Password should be greater than 8 characters',
                  },
                })}
              />
              {errors.password && (
                <span className={styles.error}>{errors.password.message}</span>
              )}
            </div>

            <div className={styles.row}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                  validate: (value) =>
                    value === watchPassword || 'Passwords do not match', // Use watchPassword here
                })}
              />
              {errors.confirmPassword && (
                <span className={styles.error}>
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <button className={styles.view} type="submit">
              Sign Up
            </button>
          </div>

          <div className={styles.login}>
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </form>
        <div className={styles.welcome}>
          <p>
            Welcome To <br />
            <span>LandQuest</span>
          </p>
          <p>Let us connect you to your dream land</p>
          <Link to="/">Back home</Link>
        </div>
      </div>
    </main>
  );
}
