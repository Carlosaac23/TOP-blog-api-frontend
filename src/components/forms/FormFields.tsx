import type {
  FormInputFieldProps,
  FormRoleSwitchFieldProps,
  FormTextareaFieldProps,
} from '@/types';

import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

function getIsInvalid(field: any) {
  return field.state.meta.isTouched && !field.state.meta.isValid;
}

export function FormInputField({
  field,
  label,
  type = 'text',
  placeholder,
  autoComplete,
}: FormInputFieldProps) {
  const isInvalid = getIsInvalid(field);

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel
        htmlFor={field.name}
        className='text-xs font-normal tracking-widest text-muted-foreground uppercase'
      >
        {label}
      </FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        type={type}
        value={field.state.value}
        onBlur={field.handleBlur}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={isInvalid}
        onChange={e => field.handleChange(e.target.value)}
        className='h-10 rounded-none border-x-0 border-t-0 border-border bg-transparent px-0 text-base shadow-none transition-colors focus-visible:border-foreground focus-visible:ring-0'
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

export function FormTextareaField({
  field,
  label,
  placeholder,
  rows = 8,
  textareaClassname = '',
}: FormTextareaFieldProps) {
  const isInvalid = getIsInvalid(field);

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel
        htmlFor={field.name}
        className='text-xs font-normal tracking-widest text-muted-foreground uppercase'
      >
        {label}
      </FieldLabel>
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
        placeholder={placeholder}
        onChange={e => field.handleChange(e.target.value)}
        rows={rows}
        className={`h-10 rounded-none border-x-0 border-t-0 border-border bg-transparent px-0 text-base shadow-none transition-colors focus-visible:border-foreground focus-visible:ring-0 ${textareaClassname}`}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

export function FormRoleSwitchField({
  field,
  label,
  leftLabel,
  rightLabel,
  ariaLabel,
}: FormRoleSwitchFieldProps) {
  const isInvalid = getIsInvalid(field);

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel
        htmlFor={field.name}
        className='text-xs font-normal tracking-widest text-muted-foreground uppercase'
      >
        {label}
      </FieldLabel>

      <div className='flex items-center gap-5'>
        <span
          className={`text-base transition-colors ${field.state.value === 'user' ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}
        >
          {leftLabel}
        </span>

        <Switch
          id={field.name}
          checked={field.state.value === 'writer'}
          onCheckedChange={checked => field.handleChange(checked ? 'writer' : 'user')}
          onBlur={field.handleBlur}
          aria-label={ariaLabel}
          className='scale-125'
        />

        <span
          className={`text-base transition-colors ${field.state.value === 'writer' ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}
        >
          {rightLabel}
        </span>
      </div>

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
