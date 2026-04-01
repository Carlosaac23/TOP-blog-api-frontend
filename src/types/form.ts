import type { InputHTMLAttributes } from 'react';

export type BaseFieldProps = {
  field: any;
  label: string;
  className?: string;
};

export type FormInputFieldProps = BaseFieldProps & {
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder?: string;
  autoComplete?: string;
};

export type FormTextareaFieldProps = BaseFieldProps & {
  placeholder?: string;
  rows?: number;
  textareaClassname?: string;
};

export type FormRoleSwitchFieldProps = BaseFieldProps & {
  leftLabel: string;
  rightLabel: string;
  ariaLabel: string;
};
