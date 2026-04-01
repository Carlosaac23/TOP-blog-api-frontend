import { useForm } from '@tanstack/react-form';
import { Link } from 'react-router-dom';

import type { CreateUserInput } from '@/schemas/userSchema';

import {
  FormInputField,
  FormTextareaField,
  FormRoleSwitchField,
} from '@/components/forms/FormFields';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useSignUp } from '@/hooks/auth/useSignUp';
import { CreateUserSchema } from '@/schemas/userSchema';

const defaultValues: CreateUserInput = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  birthDate: '',
  bio: '',
  role: 'user',
};

export default function SignUpForm() {
  const { handleSubmit } = useSignUp();

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: CreateUserSchema,
      onBlur: CreateUserSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        await handleSubmit(value);
        formApi.reset();
      } catch {
        // Keep value so user can fix and retry
      }
    },
  });

  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <div className='flex flex-1 items-start justify-center px-6 py-16 md:py-14'>
        <div className='w-full max-w-lg'>
          <div className='mb-12 flex items-center gap-4'>
            <span className='text-xs tracking-widest text-muted-foreground uppercase'>
              Create an account
            </span>
            <span className='h-px flex-1 bg-border' />
          </div>

          <h1 className='mb-4 font-serif text-5xl leading-tight font-semibold text-balance text-foreground md:text-6xl'>
            Join Bloggering
          </h1>
          <p className='mb-12 text-base leading-relaxed text-muted-foreground'>
            Read thoughtful essays, or apply as a writer and share your own.
          </p>

          <form
            onSubmit={e => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className='flex flex-col gap-8'
          >
            <FieldGroup>
              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <form.Field name='firstName'>
                    {field => (
                      <FormInputField
                        field={field}
                        label='First Name'
                        placeholder='Clara'
                        autoComplete='given-name'
                      />
                    )}
                  </form.Field>
                </div>

                <div className='flex flex-col gap-2'>
                  <form.Field name='lastName'>
                    {field => (
                      <FormInputField
                        field={field}
                        label='Last name'
                        placeholder='Holt'
                        autoComplete='family-name'
                      />
                    )}
                  </form.Field>
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <form.Field name='username'>
                  {field => (
                    <FormInputField
                      field={field}
                      label='Username'
                      placeholder='claraholt'
                      autoComplete='username'
                    />
                  )}
                </form.Field>
              </div>

              <div className='flex flex-col gap-2'>
                <form.Field name='email'>
                  {field => (
                    <FormInputField
                      field={field}
                      label='Email'
                      type='email'
                      placeholder='claraholt@hotmail.com'
                      autoComplete='email'
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
                      placeholder='••••••••'
                      autoComplete='new-password'
                    />
                  )}
                </form.Field>
              </div>

              <div className='flex flex-col gap-2'>
                <form.Field name='bio'>
                  {field => (
                    <FormTextareaField
                      field={field}
                      label='Bio'
                      placeholder='I like reading Marco Aurelio'
                      rows={5}
                    />
                  )}
                </form.Field>
              </div>

              <div className='flex flex-col gap-2'>
                <form.Field name='birthDate'>
                  {field => <FormInputField field={field} label='Birth date' type='date' />}
                </form.Field>
              </div>

              <div className='flex flex-col gap-4 py-2'>
                <form.Field name='role'>
                  {field => (
                    <FormRoleSwitchField
                      field={field}
                      label='Role'
                      leftLabel='User'
                      rightLabel='Writer'
                      ariaLabel='Toggle between User and Writer role'
                    />
                  )}
                </form.Field>
              </div>
            </FieldGroup>

            <span className='h-px bg-border' />

            <div className='flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center'>
              <Button
                className='inline-flex items-center gap-2 bg-foreground px-8 py-4 text-xs tracking-widest text-primary-foreground uppercase transition-opacity hover:opacity-80'
                type='submit'
              >
                Create account &rarr;
              </Button>
              <p className='text-xs text-muted-foreground'>
                Already a member?{' '}
                <Link
                  className='text-foreground underline underline-offset-4 transition-opacity hover:opacity-70'
                  to='/sign-in'
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
