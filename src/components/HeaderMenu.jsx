import { UserButton } from '@clerk/nextjs';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import logoUptc from '@/assets/logoUPTC24.svg';

const HeaderMenu = ({ menu }) => {
  const router = useRouter();

  return (
    <header className="flex h-[72px] justify-between items-center p-4 bg-neutral-gray-dark pattern-diagonal-lines pattern-white-500 pattern-bg-white 
  pattern-size-8 pattern-opacity-80 relative">

      <figure className="flex-shrink-0 mt-8">
        <Image src={logoUptc} alt="Logo UPTC" className="h-24 w-auto" />
      </figure>

      <ul className="ml-8 flex-1 flex justify-start gap-10 items-center list-none p-0 m-0 z-50 w-3/4">
        {Array.isArray(menu) && menu.map((item, index) => (
          <li key={index} className="transition duration-255 ease-in-out transform hover:scale-105 hover:text-primary-medium">
            {item.href ? (
              <Link href={item.href} className="text-white hover:text-primary-medium">
                {item.name}
              </Link>
            ) : (
              <span className="text-red-500">
                Require href
              </span>
            )}
          </li>
        ))}
      </ul>

      <UserButton />
    </header>
  );
};

HeaderMenu.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    href: PropTypes.string,
  })).isRequired,
};

export default HeaderMenu;
