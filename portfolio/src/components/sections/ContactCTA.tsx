import { site } from '../../content/site'
import { Icon, type IconName } from '../Icon'
import { Illustration } from '../Illustration'
import { Arrow, Container, Reveal, SectionMark } from '../ui'

/* The final section is one question, one obvious button, and a plain list of
   every other way to reach me. It works on either theme because it is built
   from the same tokens as everything else. */

export function ContactCTA() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative overflow-hidden border-t border-rule py-20 sm:py-28"
    >
      <div className="aurora pointer-events-none absolute inset-0" aria-hidden="true" />

      <Container className="relative">
        <div className="card overflow-hidden">
          <div className="grid gap-10 p-7 sm:p-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <Reveal>
              <SectionMark label="Contact" />
              <h2 className="display mt-6 max-w-[20ch] text-[2.1rem] sm:text-[2.9rem] lg:text-[3.4rem]">
                Have a problem worth <span className="text-accent">solving?</span>
              </h2>
              <p className="measure mt-5 text-[16px] leading-relaxed text-ink-soft sm:text-[17px]">
                {site.contact.support}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[14.5px] font-semibold text-accent-contrast transition-colors duration-200 hover:bg-accent-strong"
                >
                  <Icon name="mail" size={16} />
                  Email me <Arrow dir="up-right" />
                </a>
                <a
                  href={site.socials[0].href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 rounded-full border border-rule-strong bg-canvas px-6 py-3.5 text-[14.5px] font-semibold text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  <Icon name={site.socials[0].icon as IconName} size={16} />
                  {site.socials[0].label} <Arrow dir="up-right" />
                </a>
              </div>

              <p className="mt-6 flex items-center gap-2 text-[13.5px] text-ink-faint">
                <span className="text-positive">
                  <Icon name="clock" size={15} />
                </span>
                {site.contact.responseNote}
              </p>

              <Illustration scene="talk" height={120} className="mt-8 hidden sm:block" />
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="overflow-hidden rounded-panel border border-rule">
                {(
                  [
                    ['Email', site.email, `mailto:${site.email}`, 'mail'],
                    ['Based in', site.location, null, 'location'],
                    ...site.socials.map(
                      (s) => [s.label, 'Visit', s.href, s.icon] as [string, string, string, IconName]
                    ),
                    ['Resume', 'Download', site.resumeUrl, 'download'],
                  ] as [string, string, string | null, IconName][]
                ).map(([label, value, href, icon], i) => (
                  <div
                    key={label as string}
                    className={`flex items-center justify-between gap-4 px-5 py-4 ${
                      i % 2 ? 'bg-canvas' : 'bg-surface/70'
                    }`}
                  >
                    <dt className="flex items-center gap-2">
                      <span className="text-accent">
                        <Icon name={icon} size={15} />
                      </span>
                      <span className="label-sm">{label as string}</span>
                    </dt>
                    <dd className="text-[14px]">
                      {href ? (
                        <a
                          href={href as string}
                          {...(String(href).startsWith('http')
                            ? { target: '_blank', rel: 'noreferrer noopener' }
                            : {})}
                          className="inline-flex min-h-[32px] items-center font-medium text-ink transition-colors hover:text-accent"
                        >
                          {value as string}
                        </a>
                      ) : (
                        <span className="text-ink">{value as string}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
