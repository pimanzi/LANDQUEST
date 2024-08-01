import { useState } from 'react';
import styles from './LandForm.module.css';
import { useForm } from 'react-hook-form';
import Alert from '../components/Alert';

export default function LandForm() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [style, setStyle] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('upi', data.upi);
    formData.append('location', data.location);
    formData.append('price', data.price);
    formData.append('size', data.size);
    formData.append('info', data.info);
    if (data.img && data.img[0]) {
      formData.append('img', data.img[0]);
    }

    try {
      const response = await fetch('/api/plot/lands', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Land added successfully');
        setStyle('success2');
      } else {
        setMessage('Error adding land');
        setStyle('danger2');
      }
    } catch (error) {
      setMessage('An error occurred:', error);
      setStyle('danger2');
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
      {show ? <Alert message={message} style={style} setShow={setShow} /> : ''}
      <div className={styles.sign}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Land Sale Details</h2>

          <div className={styles.column}>
            <div className={styles.row}>
              <label htmlFor="upi">UPI Address</label>
              <input
                type="text"
                id="upi"
                {...register('upi', {
                  required: 'UPI Address is required',
                  pattern: {
                    value: /^[0-9-]+$/,
                    message: 'UPI Address must be a number',
                  },
                })}
              />
              {errors.upi && (
                <span className={styles.error}>{errors.upi.message}</span>
              )}
            </div>
            <div className={styles.row}>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                {...register('location', {
                  required: 'Location is required',
                  pattern: {
                    value: /^[a-zA-Z0-9\s,]+$/,
                    message:
                      'Location can only contain letters, numbers, and commas',
                  },
                })}
              />
              {errors.location && (
                <span className={styles.error}>{errors.location.message}</span>
              )}
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.row}>
              <label htmlFor="price">Amount in Rwf</label>
              <input
                type="number"
                id="price"
                {...register('price', {
                  required: 'Price is required',
                  min: {
                    value: 0,
                    message: 'Price must be a positive number',
                  },
                })}
              />
              {errors.price && (
                <span className={styles.error}>{errors.price.message}</span>
              )}
            </div>

            <div className={styles.row}>
              <label htmlFor="size">Size in Sqm</label>
              <input
                type="number"
                id="size"
                {...register('size', {
                  required: 'Size is required',
                  min: {
                    value: 0,
                    message: 'Size must be a positive number',
                  },
                })}
              />
              {errors.size && (
                <span className={styles.error}>{errors.size.message}</span>
              )}
            </div>
          </div>

          <div className={styles.row}>
            <label htmlFor="info">Plot Details</label>
            <textarea
              cols={40}
              rows={8}
              id="info"
              {...register('info', {
                required: 'Details are required',
              })}
            ></textarea>
            {errors.info && (
              <span className={styles.error}>{errors.info.message}</span>
            )}
          </div>

          <div className={styles.rowpicture}>
            <label htmlFor="img">Land Picture</label>
            <input type="file" id="img" {...register('img')} />
            {errors.img && (
              <span className={styles.error}>{errors.img.message}</span>
            )}
          </div>

          <div className={styles.viewcont}>
            <button type="submit" className={styles.view}>
              Sell
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
