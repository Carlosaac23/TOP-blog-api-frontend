import { useForm } from '@tanstack/react-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
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
        toast.error(error.response?.data?.message);
      }
    },
  });

  return (
    <div className='flex min-h-screen flex-col bg-background'>
      {/* Form area */}
      <div className='flex flex-1 items-start justify-center px-6 py-16 md:py-14'>
        <div className='w-full max-w-lg'>
          {/* Section label */}
          <div className='mb-12 flex items-center gap-4'>
            <span className='text-xs tracking-widest text-muted-foreground uppercase'>Log in</span>
            <span className='h-px flex-1 bg-border' />
          </div>

          {/* Heading */}
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
                <form.Field
                  name='identifier'
                  children={field => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel
                          htmlFor={field.name}
                          className='text-xs font-normal tracking-widest text-muted-foreground uppercase'
                        >
                          Username or email
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type='text'
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={e => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          autoComplete='given-name'
                          placeholder='claraholt@gmail.com'
                          className='h-10 rounded-none border-x-0 border-t-0 border-border bg-transparent px-0 text-base shadow-none transition-colors focus-visible:border-foreground focus-visible:ring-0'
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    );
                  }}
                />
              </div>

              <div className='flex flex-col gap-2'>
                <form.Field
                  name='password'
                  children={field => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel
                          htmlFor={field.name}
                          className='text-xs font-normal tracking-widest text-muted-foreground uppercase'
                        >
                          Password
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type='password'
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={e => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          autoComplete='new-password'
                          placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
                          className='h-10 rounded-none border-x-0 border-t-0 border-border bg-transparent px-0 text-base shadow-none transition-colors focus-visible:border-foreground focus-visible:ring-0'
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    );
                  }}
                />
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
