import { cn } from '@/lib/utils';
import { siteConfig } from '@/data/config/site.settings';
import { headerNavLinks } from '@/data/config/headerNavLinks';
import Link from './Link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import SearchButton from '../search/SearchButton';
import ActiveLink from '@/components/shared/ActiveLink';
import Image from '@/components/shared/Image';
import { GithubIcon } from 'lucide-react';

const Header = ({ className }: { className?: string }) => {
  return (
    <header
      className={cn(
        'flex items-center gap-10 py-10 flex-wrap w-full mb-20 lg:mb-32 pt-6 p-6 max-w-full container-wide',
        className,
      )}
    >
      <div>
        <Link href="/" aria-label={siteConfig.logoTitle}>
          <div className="flex items-center gap-3 justify-between">
            <Image
              src="/static/images/logo.png"
              alt="Rare Big Deal logo"
              height={54}
              width={54}
              className="group-hover:animate-wiggle w-10 h-10 md:w-14 md:h-14"
            />

            <div className="text-md sm:text-xl font-semibold h-full">
              Rare Big Deal
            </div>
          </div>
        </Link>
      </div>

      <div className="flex items-center leading-5 gap-4 sm:gap-6">
        {headerNavLinks.map((link) => (
          <ActiveLink
            key={link.title}
            href={link.href}
            className="nav-link hidden sm:block"
            activeClassName="nav-link-active"
          >
            <span>{link.title}</span>
          </ActiveLink>
        ))}
      </div>

      <div className="ml-auto flex items-center leading-5 gap-4 sm:gap-6 text-sm">
        <a
          href="https://www.youtube.com/live/F7cs6tB_iX0?si=NSdAvCJyicar61zj&t=2924"
          target="_blank"
          rel="noopener noreferrer"
          className="animated-fancy-text"
        >
          Made with Shipixen in hours
        </a>

        <a href="https://github.com/danmindru/rare-big-deal">
          <GithubIcon size={24} />
        </a>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
