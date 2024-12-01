import React from 'react';
import styled from 'styled-components';

const InputAnimated = ({ onChange, value }) => {
    return (
        <StyledWrapper>
            <div className="form-control">
                <input type="number" value={value} onChange={onChange} required />
                <label>
                    <span style={{transitionDelay: '0ms'}}>C</span><span style={{transitionDelay: '25ms'}}>o</span><span style={{transitionDelay: '50ms'}}>d</span><span style={{transitionDelay: '75ms'}}>i</span><span style={{transitionDelay: '100ms'}}>g</span><span style={{transitionDelay: '125ms'}}>o</span><span style={{transitionDelay: '150ms'}}> </span><span style={{transitionDelay: '175ms'}}>d</span><span style={{transitionDelay: '200ms'}}>e</span><span style={{transitionDelay: '225ms'}}>l</span><span style={{transitionDelay: '250ms'}}> </span><span style={{transitionDelay: '275ms'}}>e</span><span style={{transitionDelay: '300ms'}}>s</span><span style={{transitionDelay: '325ms'}}>t</span><span style={{transitionDelay: '350ms'}}>u</span><span style={{transitionDelay: '375ms'}}>d</span><span style={{transitionDelay: '400ms'}}>i</span><span style={{transitionDelay: '425ms'}}>a</span><span style={{transitionDelay: '450ms'}}>n</span><span style={{transitionDelay: '475ms'}}>t</span><span style={{transitionDelay: '500ms'}}>e</span>
                </label>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    .form-control {
        position: relative;
        margin: 20px 0 40px;
        width: 100%;
    }

    .form-control input {
        background-color: transparent;
        border: 0;
        border-bottom: 2px #000101 solid;
        display: block;
        width: 100%;
        padding: 15px 0;
        font-size: 18px;
        color: #000101;
    }

    .form-control input:focus,
    .form-control input:valid {
        outline: 0;
        border-bottom-color: #FFCC29;
    }

    .form-control label {
        position: absolute;
        top: 15px;
        left: 0;
        pointer-events: none;
    }

    .form-control label span {
        display: inline-block;
        font-size: 18px;
        min-width: 5px;
        color: #000101;
        transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .form-control input:focus+label span,
    .form-control input:valid+label span {
        color: #FFCC29;
        transform: translateY(-30px);
    }
`;

export default InputAnimated;
