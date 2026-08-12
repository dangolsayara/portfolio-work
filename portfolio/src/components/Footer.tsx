import { Link } from 'react-router-dom'
import { NAV, site } from '../content/site'
import { Icon, type IconName } from './Icon'
import { Container } from './ui'

export function Footer() {
  return (
    <footer className="border-t border-rule bg-surface/50 py-14 sm:py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[0.7rem] bg-accent text-[15px] font-bold text-accent-contrast">
                {site.wordmark.charAt(0)}
              </span>
              <p className="text-[1.15rem] font-semibold leading-none tracking-[-0.02em]">
                {site.name}
              </p>
            </div>
            <p className="apparatus-sm mt-3">{site.role}</p>
            <p className="measure-tight mt-5 text-[14.5px] leading-relaxed text-ink-faint">
              {site.footer.tagline}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="apparatus-sm mb-5">Sections</h2>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="link-rise inline-flex min-h-[32px] items-center text-[14px] text-ink-soft transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="apparatus-sm mb-5">Elsewhere</h2>
            <ul className="space-y-2.5">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-rise inline-flex min-h-[32px] items-center gap-2 text-[14px] text-ink-soft transition-colors hover:text-ink"
                  >
                    <Icon name={s.icon as IconName} size={15} />
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-rise inline-flex min-h-[32px] items-center gap-2 text-[14px] text-ink-soft transition-colors hover:text-ink"
                >
                  <Icon name="mail" size={15} />
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="apparatus-sm">© {new Date().getFullYear()} {site.name}</p>
          {/* Delete this line once the sample content has been replaced. */}
          <p className="apparatus-sm">{site.footer.sampleNotice}</p>
        </div>
      </Container>
    </footer>
  )
}
