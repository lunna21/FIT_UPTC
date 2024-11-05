import { UserButton } from '@clerk/nextjs';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';

import logo from '@/assets/logo.png';

const HeaderMenu = ({ menu }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <figure className='w-18 h-16 mx-auto flex items-center'>
        <Image src={logo} alt="Logo" className="h-10 w-full" />
      </figure>

      <ul className="flex-1 flex justify-around items-center list-none p-0 m-0">
        {Array.isArray(menu) && menu.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <Link href={item.href}>
                {item.name}
              </Link>
            ) : (
              <span>
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
