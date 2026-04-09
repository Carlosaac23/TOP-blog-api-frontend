import { Link } from 'react-router-dom';

export default function PublicHome() {
  return (
    <section aria-label='Featured post' className='border-b border-border'>
      <div className='mx-auto max-w-6xl px-6 py-16 md:py-24'>
        <div className='grid items-center gap-12 md:grid-cols-2 md:gap-20'>
          <div className='order-2 flex flex-col gap-8 md:order-1'>
            <div className='flex items-center gap-4'>
              <span className='text-xs tracking-widest text-muted-foreground uppercase'>
                Start reading
              </span>
              <span className='h-px flex-1 bg-border' />
            </div>

            <h1 className='font-serif text-5xl leading-tight font-semibold text-balance text-foreground md:text-6xl'>
              On the Art of Doing Nothing at All
            </h1>

            <p className='text-lg leading-relaxed text-pretty text-muted-foreground'>
              In a culture obsessed with productivity, the radical act of stillness may be the most
              subversive thing left. A meditation on idleness, presence, and what we lose when every
              moment must be earned.
            </p>

            <div className='flex items-center gap-4 pt-2'>
              <div>
                <p className='text-sm font-semibold text-foreground'>Clara Holt</p>
                <p className='text-xs text-muted-foreground'>March 18, 2026 &bull; 12 min read</p>
              </div>
            </div>

            <Link
              to='/sign-up'
              className='inline-flex items-center gap-2 self-start border border-foreground px-6 py-4 text-xs tracking-widest text-foreground uppercase transition-colors hover:bg-foreground hover:text-primary-foreground'
            >
              Start reading
              <span aria-hidden='true'>&rarr;</span>
            </Link>
          </div>

          <div className='relative order-1 aspect-4/3 overflow-hidden md:order-2'>
            <img
              className='object-cover'
              src='/images/featured.jpg'
              alt='A leather journal and cup of coffee on linen cloth'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
