import styled from 'styled-components';

const ButtonBurger = ({ onChange, value }) => {
    return (
        <BurgerStyledWrapper>
            <label htmlFor="check" className="menuButton">
                <input id="check" type="checkbox" value={value} onChange={() => onChange(!value)} />
                <span className="top" />
                <span className="mid" />
                <span className="bot" />
            </label>
        </BurgerStyledWrapper>
    )
}

export default ButtonBurger;

const BurgerStyledWrapper = styled.div`
  display: none;
  z-index: 200;
  .menuButton {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 13%;
    color: #090909;
    width: 36px;
    height: 36px;
    background-color: rgba(49, 49, 49, 0.72);
    border: 1px solid #FFCC00;
    border-radius: 8px;
    transition: all .3s;
    cursor: pointer;
  }

  .menuButton:active {
    color: #666;
    box-shadow: inset 0 4px 6px -1px rgba(0, 0, 0, 0.1), inset 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  input[type = "checkbox"] {
    -webkit-appearance: none;
    display: none;
    visibility: hidden;
  }

  .menuButton span {
    width: 24px;
    height: 2px;
    background: #FFCC00;
    border-radius: 100px;
    transition: 0.3s ease;
  }

  input[type]:checked ~ span.top {
    transform: translateY(290%)rotate(45deg);
    width: 24px;
  }

  input[type]:checked ~ span.bot {
    transform: translateY(-270%) rotate(-45deg);
    width: 24px;
    box-shadow: 0 0 10px #495057;
  }

  input[type]:checked ~ span.mid {
    transform: translateX(-20px);
    opacity: 0;
  }
  @media (max-width: 768px) {
    display: block;
  }    
`;