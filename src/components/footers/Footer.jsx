
import CopyRightLine from "./CopyRightLine";
import FooterSocial from "./FooterSocial";
import FooterFeedback from "./FooterFeedback";

import Image from 'next/image';
import zonaLogos from '@/assets/zonaLogosUptc.png';

import styled from 'styled-components';

const Footer = () => {

    return (
        <div className="w-full bg-neutral-gray-dark">
            <div className="flex justify-around">
                <SocialImageStyled className="flex flex-col justify-center items-center mt-4">
                    <figure className="p-1 rounded-md mb-2 max-h-36 max-w-80 object-cover">
                        <Image src={zonaLogos} alt="Logo UPTC" className="w-full h-full object-contain" priority/>
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