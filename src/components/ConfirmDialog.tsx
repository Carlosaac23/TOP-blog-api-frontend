import type { ConfirmDialogProps } from 'react-confirm';

import { confirmable, createConfirmation } from 'react-confirm';

import { Button } from '@/components/ui/button';

const ConfirmDialog = ({
  show,
  proceed,
  message,
}: ConfirmDialogProps<{ message: string }, boolean>) => (
  <div
    className={`fixed inset-0 z-100 flex items-center justify-center bg-foreground/45 px-6 transition-opacity ${
      show ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
    }`}
  >
    <div className='w-full max-w-md border border-border bg-background p-6 shadow-lg'>
      <div className='mb-5 flex items-center gap-4'>
        <span className='text-xs tracking-widest text-muted-foreground uppercase'>
          Confirm action
        </span>
        <span className='h-px flex-1 bg-border' />
      </div>

      <p className='text-sm leading-relaxed text-foreground'>{message}</p>

      <div className='mt-6 flex items-center justify-end gap-2'>
        <Button type='button' variant='outline' size='sm' onClick={() => proceed(false)}>
          Cancel
        </Button>
        <Button type='button' variant='destructive' size='sm' onClick={() => proceed(true)}>
          Delete
        </Button>
      </div>
    </div>
  </div>
);

export const confirm = createConfirmation(confirmable(ConfirmDialog));
