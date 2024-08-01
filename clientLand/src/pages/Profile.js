import styles from './Profile.module.css';
import { useAuth } from '../components/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Alert from '../components/Alert';

function Profile() {
  const { checkauth } = useAuth;
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [message, setMessage] = useState('');
  const [style, setStyle] = useState('');
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onSubmit',
  });

  const watchNewPassword = watch('newPassword');

  async function updateGeneralInfo(data) {
    const formData = new FormData();

    // Use existing values from `auth` for any fields not provided in `data`
    const currentData = {
      userName: auth?.userName,
      firstName: auth?.firstName,
      lastName: auth?.lastName,
      email: auth?.email,
      number: auth?.number,
      image_file: auth?.image_file,
    };

    // Merge the existing data with new data, updating only the provided fields
    const updatedData = {
      userName: data.userName ? data.userName : currentData.userName,
      firstName: data.firstName ? data.firstName : currentData.firstName,
      lastName: data.lastName ? data.lastName : currentData.lastName,
      emaiil: data.email ? data.email : currentData.email,
      number: data.number ? data.number : currentData.number,
    };

    // Append the updated data to FormData
    Object.keys(updatedData).forEach((key) => {
      formData.append(key, updatedData[key]);
    });

    try {
      const response = await fetch('/api/auth/update-info', {
        method: 'PUT',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setStyle('success');
        console.log(message);

        checkauth();
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.log(message);
      setStyle('danger');
    } finally {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setMessage('');
        setStyle('');
        setStatus('');
      }, 10000);
    }
  }

  async function logOut() {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      try {
        const requestOptions = {
          method: 'GET',
        };

        const res = await fetch('/api/auth/logout', requestOptions);
        const result = await res.json();

        if (res.ok) {
          setAuth(null);
          navigate('/');
          setMessage(result.message);
        } else {
          setMessage('Logout failed. Please try again.');
        }
      } catch (error) {
        setMessage('An error occurred. Please try again.');
      }
    }
  }

  return (
    <div className={styles.main}>
      <h2>User Profile</h2>
      <p className={styles.manage}>Manage your account details and privacy</p>

      <div className={styles.container1}>
        <div className={styles.profile}>
          <img src={auth?.image_file} alt="profile"></img>
          <p>
            {auth?.firstName} {auth?.lastName}
          </p>
          <button>Edit profile picture</button>
        </div>

        <div className={styles.general}>
          {show ? (
            <Alert message={message} style={style} setShow={setShow} />
          ) : (
            ''
          )}
          <h3>General Informations</h3>

          <form onSubmit={handleSubmit(updateGeneralInfo)}>
            <div className={styles.minContainer}>
              <input
                type="text"
                defaultValue={auth?.userName}
                {...register('userName', {
                  pattern: {
                    value: /^[a-zA-Z0-9_]{3,16}$/,
                    message: 'Invalid username',
                  },
                })}
              />
              {errors.userName && (
                <span className={styles.error}>{errors.userName.message}</span>
              )}

              <input
                type="text"
                defaultValue={auth?.firstName}
                {...register('firstName', {})}
              />
              {errors.firstName && (
                <span className={styles.error}>{errors.firstName.message}</span>
              )}
            </div>

            <div className={styles.minContainer}>
              <input
                type="text"
                defaultValue={auth?.lastName}
                {...register('lastName', {})}
              />
              {errors.lastName && (
                <span className={styles.error}>{errors.lastName.message}</span>
              )}

              <input
                type="email"
                defaultValue={auth?.email}
                {...register('email', {
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

            <div className={styles.minContainer}>
              <input
                type="text"
                defaultValue={auth?.number}
                {...register('number', {
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
              <input type="file" {...register('image_file')}></input>

              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.security1}>
        <div className={styles.logout}>
          <button onClick={() => logOut()}>LogOut</button>
          <button className={styles.home} onClick={() => navigate('/')}>
            Back Home
          </button>
        </div>

        <div className={styles.general}>
          <h3>Security </h3>
          <form>
            <div className={styles.minContainer}>
              <input
                type="password"
                placeholder="currentPassword"
                {...register('currentPassword', {})}
              />
              {errors.currentPassword && (
                <span className={styles.error}>
                  {errors.currentPassword.message}
                </span>
              )}

              <input
                type="password"
                placeholder="New Password"
                {...register('newPassword', {
                  minLength: {
                    value: 9,
                    message: 'Password should be greater than 8 characters',
                  },
                })}
              />
              {errors.newPassword && (
                <span className={styles.error}>
                  {errors.newPassword.message}
                </span>
              )}
            </div>

            <div className={styles.minContainer}>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword', {
                  validate: (value) =>
                    value === watchNewPassword || 'Passwords do not match',
                })}
              />
              {errors.confirmPassword && (
                <span className={styles.error}>
                  {errors.confirmPassword.message}
                </span>
              )}

              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
