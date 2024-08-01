import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Alert from '../components/Alert';
import { useAuth } from '../components/AuthContext'; // Import useAuth

export default function Login() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [style, setStyle] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onBlur' });

  const loginUser = async (data) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch('/api/auth/login', requestOptions);
      const result = await response.json();

      console.log('Server response:', result); // Debug: Log the server response

      if (!response.ok) {
        throw new Error(result.message || 'An error occurred');
      }

      setMessage(result.message);
      setStyle('success');

      await checkAuth();
      navigate('/'); // Redirect to home page
    } catch (err) {
      setMessage(err.message || 'An unknown error occurred');
      setStyle('danger1');
    } finally {
      reset();
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setMessage('');
        setStyle('');
      }, 10000);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.login}>
        {show && <Alert message={message} style={style} setShow={setShow} />}
        <form className={styles.form} onSubmit={handleSubmit(loginUser)}>
          <h2>Log In</h2>

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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: 'Password field is required',
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

          <div>
            <button className={styles.view} type="submit">
              Login
            </button>
          </div>

          <div className={styles.sign}>
            <p>
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </form>

        <div className={styles.welcome}>
          <p>
            Log in to <br />
            <span>LandQuest</span>
          </p>
          <p>Explore the best lands in Rwanda</p>
          <Link to="/">Back Home</Link>
        </div>
      </div>
    </main>
  );
}
