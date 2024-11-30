
import styled from 'styled-components';

const CopyRightLine = () => {

    return (
        <CopyRightStyled className="w-full flex justify-center items-center pt-2 mt-2 pb-2 text-sm font-medium">
            <p className="text-white">© UPTC FIT</p>
        </CopyRightStyled>
    )
}

export default CopyRightLine;

const CopyRightStyled = styled.div`
    border-top: 1px solid hsl(0, 0%, 43.13725490196079%);

    @media (min-height: 768px) {
        font-size: 16px;
        font-weight: 700;
    }
`