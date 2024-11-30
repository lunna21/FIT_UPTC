
import CopyRightLine from "./CopyRightLine";
import FooterSocial from "./FooterSocial";
import FooterFeedback from "./FooterFeedback";

const Footer = ({ withCommetSection = false }) => {

    return (
        <div className="w-full bg-neutral-gray-dark mt-4">
            {
                withCommetSection && (
                    <FooterFeedback />
                )
            }

            <FooterSocial />
            <CopyRightLine />

        </div>
    )

}

export default Footer;