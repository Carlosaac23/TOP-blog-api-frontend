import { useForm } from '@tanstack/react-form';
import { Link } from 'react-router-dom';

import type { CreateUserInput } from '@/schemas/userSchema';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useSignUp } from '@/hooks/useSignUp';
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
      {/* Form area */}
      <div className='flex flex-1 items-start justify-center px-6 py-16 md:py-14'>
        <div className='w-full max-w-lg'>
          {/* Section label */}
          <div className='mb-12 flex items-center gap-4'>
            <span className='text-xs tracking-widest text-muted-foreground uppercase'>
              Create an account
            </span>
            <span className='h-px flex-1 bg-border' />
          </div>

          {/* Heading */}
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
                  <form.Field
                    name='firstName'
                    children={field => {
                      const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel
                            htmlFor={field.name}
                            className='text-xs font-normal tracking-widest text-muted-foreground uppercase'
                          >
                            First name
                          </FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            // type='text'
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            autoComplete='given-name'
                            placeholder='Clara'
                            aria-invalid={isInvalid}
                            onChange={e => field.handleChange(e.target.value)}
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
                    name='lastName'
                    children={field => {
                      const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel
                            htmlFor={field.name}
                            className='text-xs font-normal tracking-widest text-muted-foreground uppercase'
                          >
                            Last name
                          </FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            // type='text'
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            autoComplete='family-name'
                            placeholder='Holt'
                            aria-invalid={isInvalid}
                            onChange={e => field.handleChange(e.target.value)}
                            className='h-10 rounded-none border-x-0 border-t-0 border-border bg-transparent px-0 text-base shadow-none transition-colors focus-visible:border-foreground focus-visible:ring-0'
                          />
                          {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                      );
                    }}
                  />
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <form.Field
                  name='username'
                  children={field => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel
                          htmlFor={field.name}
                          className='text-xs font-normal tracking-widest text-muted-foreground uppercase'
                        >
                          Username
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          // type='text'
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          autoComplete='username'
                          placeholder='claraholt'
                          aria-invalid={isInvalid}
                          onChange={e => field.handleChange(e.target.value)}
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
                  name='email'
                  children={field => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel
                          htmlFor={field.name}
                          className='text-xs font-normal tracking-widest text-muted-foreground uppercase'
                        >
                          Email
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type='email'
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          autoComplete='email'
                          placeholder='claraholt@hotmail.com'
                          aria-invalid={isInvalid}
                          onChange={e => field.handleChange(e.target.value)}
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
                          autoComplete='new-password'
                          placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
                          aria-invalid={isInvalid}
                          onChange={e => field.handleChange(e.target.value)}
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
                  name='bio'
                  children={field => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel
                          htmlFor={field.name}
                          className='text-xs font-normal tracking-widest text-muted-foreground uppercase'
                        >
                          Bio
                        </FieldLabel>
                        <Textarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          aria-invalid={isInvalid}
                          placeholder='I like reading Marco Aurelio'
                          onChange={e => field.handleChange(e.target.value)}
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
                  name='birthDate'
                  children={field => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel
                          htmlFor={field.name}
                          className='text-xs font-normal tracking-widest text-muted-foreground uppercase'
                        >
                          Birth date
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type='date'
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          aria-invalid={isInvalid}
                          onChange={e => field.handleChange(e.target.value)}
                          className='h-10 rounded-none border-x-0 border-t-0 border-border bg-transparent px-0 text-base shadow-none transition-colors focus-visible:border-foreground focus-visible:ring-0'
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    );
                  }}
                />
              </div>

              <div className='flex flex-col gap-4 py-2'>
                <form.Field
                  name='role'
                  children={field => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Role</FieldLabel>
                        <div className='flex items-center gap-5'>
                          <span
                            className={`text-base transition-colors ${field.state.value === 'user' ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}
                          >
                            User
                          </span>
                          <Switch
                            id={field.name}
                            checked={field.state.value === 'writer'}
                            onCheckedChange={checked =>
                              field.handleChange(checked ? 'writer' : 'user')
                            }
                            onBlur={field.handleBlur}
                            aria-label='Toggle between User and Writer role'
                            className='scale-125'
                          />
                          <span
                            className={`text-base transition-colors ${field.state.value === 'writer' ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}
                          >
                            Writer
                          </span>
                        </div>
                      </Field>
                    );
                  }}
                />
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
