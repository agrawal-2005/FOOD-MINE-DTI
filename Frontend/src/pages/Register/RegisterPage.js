import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input/Input';
import Title from '../../components/Title/Title';
import classes from './registerPage.module.css';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { EMAIL } from '../../constants/patterns';

export default function RegisterPage() {
  const auth = useAuth();
  const { user } = auth;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate('/');
  }, [user]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submit = async data => {
    await auth.register(data);
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Register" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="text"
            label="Name"
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 5,
                message: 'Name must be at least 5 characters long',
              },
            })}
            error={errors.name?.message}
          />

          <Input
            type="email"
            label="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: EMAIL,
                message: 'Please enter a valid email address',
              },
            })}
            error={errors.email?.message}
          />

          <Input
            type="password"
            label="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 5,
                message: 'Password must be at least 5 characters long',
              },
            })}
            error={errors.password?.message}
          />

          <Input
            type="password"
            label="Confirm Password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: value =>
                value === getValues('password') || 'Passwords do not match',
            })}
            error={errors.confirmPassword?.message}
          />

          <Input
            type="text"
            label="Address"
            {...register('address', {
              required: 'Address is required',
              minLength: {
                value: 10,
                message: 'Address must be at least 10 characters long',
              },
            })}
            error={errors.address?.message}
          />

          <Button type="submit" text="Register" />

          <div className={classes.login}>
            Already a user?&nbsp;
            <Link to={`/login${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
