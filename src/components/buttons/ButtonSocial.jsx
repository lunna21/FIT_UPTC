import Link from 'next/link';

const ButtonSocial = ({ SocialIcon, href }) => {
    return (
        <Link 
            className="w-10 h-10 p-2 rounded-lg flex justify-center items-center transition ease-in-out duration-300 border-2 border-transparent hover:border-primary focus:border-primary" 
            href={href}
            about='_blank'
        >
            {
                SocialIcon && <SocialIcon className="text-white text-2xl"/>
            }
        </Link>
    );
}

export default ButtonSocial;