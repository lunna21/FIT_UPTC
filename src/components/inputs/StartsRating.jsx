import React from 'react';
import styled from 'styled-components';

const StartsRating = ({ rating, setRating }) => {
    return (
        <StartsRatingStyled className="radio">
            {[1, 2, 3, 4, 5].reverse().map((value) => (
                <React.Fragment key={value}>
                    <input
                        value={value}
                        name="rating"
                        type="radio"
                        id={`rating-${value}`}
                        checked={rating === value}
                        onChange={() => setRating(value)}
                    />
                    <label title={`${value} stars`} htmlFor={`rating-${value}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                            <path
                                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                            ></path>
                        </svg>
                    </label>
                </React.Fragment>
            ))}
        </StartsRatingStyled>
    );
};

export default StartsRating;

const StartsRatingStyled = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-direction: row-reverse;
    position: relative;

    input {
        position: absolute;
        appearance: none;
    }

    label {
        cursor: pointer;
        font-size: 30px;
        position: relative;
        display: inline-block;
        transition: transform 0.3s ease;
    }

    label > svg {
        fill: #666;
        transition: fill 0.3s ease;
    }

    label::before,
    label::after {
        content: "";
        position: absolute;
        width: 6px;
        height: 6px;
        background-color: #FFCC00;
        border-radius: 50%;
        opacity: 0;
        transform: scale(0);
        transition: transform 0.4s ease, opacity 0.4s ease;
        animation: particle-explosion 1s ease-out;
    }

    label::before {
        top: -15px;
        left: 50%;
        transform: translateX(-50%) scale(0);
    }

    label::after {
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%) scale(0);
    }

    label:hover::before,
    label:hover::after {
        opacity: 1;
        transform: translateX(-50%) scale(1.5);
    }

    label:hover {
        transform: scale(1.2);
        animation: pulse 0.6s infinite alternate;
    }

    label:hover > svg {
        fill: #FFCC00;
        filter: drop-shadow(0 0 15px #FDE381);
        animation: shimmer 1s ease infinite alternate;
    }

    input:checked + label > svg {
        fill: #FFCC00;
        filter: drop-shadow(0 0 15px #FDE381);
        animation: pulse 0.8s infinite alternate;
    }

    input:checked + label ~ label > svg,
    input:checked + label > svg {
        fill: #FFCC00;
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(1.1);
        }
    }

    @keyframes particle-explosion {
        0% {
            opacity: 0;
            transform: scale(0.5);
        }
        50% {
            opacity: 1;
            transform: scale(1.2);
        }
        100% {
            opacity: 0;
            transform: scale(0.5);
        }
    }

    @keyframes shimmer {
        0% {
            filter: drop-shadow(0 0 10px #FDE381);
        }
        100% {
            filter: drop-shadow(0 0 20px #FDE381);
        }
    }

    input:checked + label:hover,
    input:checked + label:hover ~ label {
        fill: #e58e09;
    }

    label:hover,
    label:hover ~ label {
        fill: #FFCC00;
    }

    input:checked ~ label svg {
        fill: #ffa723;
    }
`;