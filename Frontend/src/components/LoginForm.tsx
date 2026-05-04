import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../types/schemas';
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/authApi';

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('Login successful', data);
    },
    onError: (error: Error) => {
      console.error('Login failed', error.message);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const getInputClass = (field: keyof LoginFormData) => {
    const isTouched = touchedFields[field];
    const hasError = errors[field];
    let baseClass = 'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200';
    if (hasError) {
      baseClass += ' border-red-500 focus:ring-red-500 focus:ring-offset-red-50';
    } else if (isTouched) {
      baseClass += ' border-green-500 focus:ring-green-500 focus:ring-offset-green-50';
    } else {
      baseClass += ' border-gray-300 focus:ring-indigo-500 focus:border-indigo-500';
    }
    return baseClass;
  };

  return (
    <>
      <h2 className='text-2xl font-bold mb-6 text-center text-indigo-900'>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <div>
          <label className='block text-indigo-700 font-semibold text-sm mb-2'>Email</label>
          <input
            type='email'
            {...register('email')}
            className={getInputClass('email')}
            placeholder='tu@email.com'
          />
          {errors.email && <p className='text-red-500 text-xs mt-1.5 font-medium'>{errors.email.message}</p>}
        </div>
        <div>
          <label className='block text-indigo-700 font-semibold text-sm mb-2'>Contraseña</label>
          <input
            type='password'
            {...register('password')}
            className={getInputClass('password')}
            placeholder='••••••••'
          />
          {errors.password && <p className='text-red-500 text-xs mt-1.5 font-medium'>{errors.password.message}</p>}
        </div>
        {loginMutation.error && <p className='text-red-500 text-sm p-3 bg-red-50 rounded-lg font-medium'>Error: {loginMutation.error.message}</p>}
        <button
          type='submit'
          disabled={loginMutation.isPending}
          className='w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-semibold shadow-md'
        >
          {loginMutation.isPending ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </>
  );
}
