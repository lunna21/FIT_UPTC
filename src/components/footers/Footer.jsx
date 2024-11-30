
import CopyRightLine from "./CopyRightLine";
import FooterSocial from "./FooterSocial";
import FooterFeedback from "./FooterFeedback";

import Image from 'next/image';
import zonaLogos from '@/assets/zonaLogosUptc.svg';

import styled from 'styled-components';

const Footer = () => {

    return (
        <div className="w-full bg-neutral-gray-dark mt-4">
            <div className="flex justify-around">
                <SocialImageStyled className="flex flex-col justify-center items-center mt-2">
                    <figure className="max-w-[320px] bg-neutral-gray-light py-2 px-4 rounded-md mb-2">
                        <Image src={zonaLogos} alt="Logo UPTC" className="h-12 w-auto object-fit" priority />
                    </figure>
                    <FooterSocial />
                </SocialImageStyled>

                <FooterFeedback />
            </div>


            <CopyRightLine />
        </div>
    )

}

export default Footer;

const SocialImageStyled = styled.div`
    @media (max-width: 768px) {
        display: none;
    }
`