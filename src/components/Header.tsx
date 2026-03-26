import { useState } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Sign Up', href: '/sign-up' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 border-b border-border bg-background'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:py-8'>
        {/* Nav left */}
        <nav className='hidden items-center gap-12 md:flex' aria-label='Primary'>
          {navLinks.slice(0, 1).map(link => (
            // <a
            //   key={link.label}
            //   href={link.href}
            //   className='text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground'
            // >
            //   {link.label}
            // </a>
            <Link
              key={link.label}
              className='text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground'
              to={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href='/'
          className='font-serif text-3xl font-semibold tracking-tight text-balance text-foreground md:text-4xl'
        >
          Bloggering
        </a>

        {/* Nav right */}
        <nav className='hidden items-center gap-12 md:flex' aria-label='Secondary'>
          {navLinks.slice(1).map(link => (
            <a
              key={link.label}
              href={link.href}
              className='text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground'
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className='flex flex-col gap-1.5 p-1 text-foreground md:hidden'
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label='Toggle menu'
        >
          <span
            className={`block h-px w-6 bg-foreground transition-all ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-all ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-all ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      <div className='hidden border-t border-border md:block'>
        <div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-3'>
          <span className='text-xs tracking-widest text-muted-foreground uppercase'>
            {new Date().toLocaleDateString('en-US', { dateStyle: 'medium' })}
          </span>
          <a
            href='#'
            className='text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground'
          >
            Subscribe &rarr;
          </a>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className='border-t border-border bg-background md:hidden' aria-label='Mobile'>
          <ul className='flex flex-col divide-y divide-border'>
            {navLinks.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className='block px-6 py-4 text-sm tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground'
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
