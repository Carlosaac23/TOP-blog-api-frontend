const footerLinks = {
  Topics: ['Essays', 'Culture', 'Design', 'Philosophy', 'Travel'],
  Connect: ['About', 'Contributors', 'Archive', 'Contact'],
};

export default function Footer() {
  return (
    <footer className='border-t border-border bg-background' role='contentinfo'>
      <div className='mx-auto max-w-6xl px-6 py-16 md:py-20'>
        <div className='grid gap-14 md:grid-cols-3 md:gap-20'>
          {/* Brand */}
          <div className='flex flex-col gap-6'>
            <span className='font-serif text-3xl font-semibold text-foreground'>
              The Commonplace
            </span>
            <p className='text-base leading-relaxed text-pretty text-muted-foreground'>
              A slow publication for thoughtful readers. Essays on culture, design, and the texture
              of everyday life.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className='flex flex-col gap-6'>
              <h3 className='text-xs font-semibold tracking-widest text-muted-foreground uppercase'>
                {group}
              </h3>
              <ul className='flex flex-col gap-4'>
                {links.map(link => (
                  <li key={link}>
                    <a
                      href='#'
                      className='text-base text-foreground transition-colors hover:text-muted-foreground'
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className='mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center'>
          <p className='text-xs text-muted-foreground'>
            &copy; 2026 The Commonplace. All rights reserved.
          </p>
          <p className='text-xs text-muted-foreground'>
            {new Date().toLocaleDateString('en-US', { dateStyle: 'medium' })}
          </p>
        </div>
      </div>
    </footer>
  );
}
