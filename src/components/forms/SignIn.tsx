import { useForm } from '@tanstack/react-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { FormInputField } from '@/components/forms/FormFields';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useSignIn } from '@/hooks/auth/useSignIn';
import { LoginUserSchema } from '@/schemas/userSchema';

export default function SignInForm() {
  const { handleSubmit } = useSignIn();

  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    validators: {
      onSubmit: LoginUserSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        await handleSubmit(value);
        formApi.reset();
      } catch (error: any) {
        toast.error(error?.message);
      }
    },
  });

  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <div className='flex flex-1 items-start justify-center px-6 py-16 md:py-14'>
        <div className='w-full max-w-lg'>
          <div className='mb-12 flex items-center gap-4'>
            <span className='text-xs tracking-widest text-muted-foreground uppercase'>Log in</span>
            <span className='h-px flex-1 bg-border' />
          </div>

          <h1 className='mb-4 font-serif text-5xl leading-tight font-semibold text-balance text-foreground md:text-6xl'>
            Welcome Back
          </h1>
          <p className='mb-12 text-base leading-relaxed text-muted-foreground'>
            Log in to keep reading thoughtful posts and continue sharing your opinions.
          </p>

          <form
            onSubmit={e => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className='flex flex-col gap-8'
          >
            <FieldGroup>
              <div className='flex flex-col gap-2'>
                <form.Field name='identifier'>
                  {field => (
                    <FormInputField
                      field={field}
                      label='Username or email'
                      placeholder='claraholt@gmail.com'
                      autoComplete='given-name'
                    />
                  )}
                </form.Field>
              </div>

              <div className='flex flex-col gap-2'>
                <form.Field name='password'>
                  {field => (
                    <FormInputField
                      field={field}
                      label='Password'
                      type='password'
                      placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
                      autoComplete='new-password'
                    />
                  )}
                </form.Field>
              </div>
            </FieldGroup>

            <div className='flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center'>
              <Button
                type='submit'
                className='inline-flex items-center gap-2 bg-foreground px-8 py-4 text-xs tracking-widest text-primary-foreground uppercase transition-opacity hover:opacity-80'
              >
                Sign in &rarr;
              </Button>
              <p className='text-xs text-muted-foreground'>
                Doesn't have an account?{' '}
                <Link
                  className='text-foreground underline underline-offset-4 transition-opacity hover:opacity-70'
                  to='/sign-up'
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
