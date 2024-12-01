import React from 'react';
import styled from 'styled-components';

import { IoSearchOutline } from "react-icons/io5";

const ButtonSearch = ({ onClick }) => {
    return (
        <StyledWrapper>
            <button onClick={onClick}>
                <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                        <IoSearchOutline />
                    </div>
                </div>
                <span>Buscar</span>
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  button {
    font-family: inherit;
    font-size: 20px;
    background: #FFCC00;
    color: #373634;
    padding: 4px 16px;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.2s;
    cursor: pointer;
  }

  button:hover {
    background: #FFD633;
  }

  button span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
  }

  button svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
  }

  button:hover .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
  }

  button:active {
    transform: scale(0.95);
  }

  @keyframes fly-1 {
    from {
      transform: translateY(0.1em);
    }

    to {
      transform: translateY(-0.1em);
    }
  }`;

export default ButtonSearch;
