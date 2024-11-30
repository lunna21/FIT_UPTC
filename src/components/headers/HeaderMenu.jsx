import { useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';

import logoUptc from '@/assets/logoUPTC24.svg';
import ButtonHelp from '@/components/buttons/ButtonHelp'
import ButtonBurger from '@/components/buttons/ButtonBurger'
import FooterMobile from '@/components/footers/Footer'

import styled from 'styled-components';

const HeaderMenu = ({ menu }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="flex h-[72px] justify-between items-center p-4 bg-neutral-gray-dark pattern-diagonal-lines pattern-white-500 pattern-bg-white 
  pattern-size-8 pattern-opacity-80 relative">
      <LinkMobileStyled>
        <Link href="/">
          <figure className="flex-shrink-0 mt-8">
            <Image src={logoUptc} alt="Logo UPTC" className="h-24 w-auto" priority />
          </figure>
        </Link>
      </LinkMobileStyled>
      <ButtonBurger value={showMenu} onChange={setShowMenu} />
      {
        showMenu && (
          <DesplegableMenuStyled>
            <div className='container-info'>
              <div>
                <Link href="/" className='flex justify-center'>
                  <figure>
                    <Image src={logoUptc} alt="Logo UPTC" className="h-24 w-auto" priority />
                  </figure>
                </Link>
                <ul>
                  {Array.isArray(menu) && menu.map((item, index) => (
                    <li key={index}>
                      <Link href={item.href} className='flex w-full items-center justify-between link'>
                        {item.name}
                        {<item.icon />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <FooterMobile />
            </div>
          </DesplegableMenuStyled>
        )
      }
      <UlHiddenMobileStyled>
        {Array.isArray(menu) && menu.map((item, index) => (
          <li key={index} className="transition duration-200 ease-in-out transform hover:scale-105 hover:text-primary-medium">
            <Link href={item.href} className="text-white hover:text-primary-medium">
              {item.name}
            </Link>
          </li>
        ))}
      </UlHiddenMobileStyled>
      <div className="flex items-center">
        <ButtonHelp />
        <UserButton />
      </div>
    </header>
  );
};

HeaderMenu.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    href: PropTypes.string,
    icon: PropTypes.func,
  })).isRequired,
};

export default HeaderMenu;

const LinkMobileStyled = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`

const DesplegableMenuStyled = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;

  .container-info {
    height: 100vh;
    width: 80vw;
    background: #373634;
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  ul {
    list-style: none;
    padding: 28px 60px;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;

  }

  .link {
    color: #f1f1f1;
    padding: 12px 28px;
    border: 1px solid #FFCC00;
    border-radius: 100px;
    background: hsl(0, 0%, 91%, 0.1);
  }
`

const UlHiddenMobileStyled = styled.ul`
  display: flex;
  justify-content: start;
  gap: 36px;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-left: 24px;
  z-index: 50;
  width: 75%;

    @media (max-width: 768px) {
      display: none;
    }  
`

