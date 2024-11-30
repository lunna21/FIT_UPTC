import ButtonSocial from '@/components/buttons/ButtonSocial';

import { FaFacebook, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";

const FooterSocial = () => {
    const SOCIAL_LINKS = {
        facebook: 'https://www.facebook.com/UPTCoficial',
        twitter: 'https://x.com/UPTCoficial',
        instagram: 'https://www.instagram.com/uptcoficial/',
        youtube: 'https://www.youtube.com/channel/UC2Msd-vi6PsH_6q3JJKcAOw'
    }

    return (
        <div className='w-full flex justify-center gap-6 items-center'>
            <ButtonSocial
                SocialIcon={FaFacebook}
                href={`${SOCIAL_LINKS.facebook}`}
            />
            <ButtonSocial
                SocialIcon={FaXTwitter}
                href={`${SOCIAL_LINKS.twitter}`}
            />
            <ButtonSocial
                SocialIcon={FiInstagram}
                href={`${SOCIAL_LINKS.instagram}`}
            />
            <ButtonSocial
                SocialIcon={FaYoutube}
                href={`${SOCIAL_LINKS.youtube}`}
            />
        </div>
    )
}

export default FooterSocial;