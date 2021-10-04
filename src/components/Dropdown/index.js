import { useState, useEffect, useRef } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";

const Dropdown = ({ popperComponent, children, closeOnClickInside = true }) => {
  const [visible, setVisibility] = useState(false);

  const referenceRef = useRef(null);
  const popperRef = useRef(null);

  const handleClickOutsidePopper = (e) => {
    if (referenceRef?.current?.contains(e.target)) return;

    setVisibility(false);
  };

  const handleClickInsidePopper = (e) => {
    const clickedInside = popperRef?.current?.contains(e.target);
    if (clickedInside && !closeOnClickInside) e.stopPropagation();
  };

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement: "bottom-end",
      modifiers: [
        {
          name: "offset",
          enabled: true,
        },
      ],
    }
  );
  useEffect(() => {
    // listen for clicks and close dropdown on body
    document.addEventListener("click", handleClickOutsidePopper);
    return () => {
      document.removeEventListener("click", handleClickOutsidePopper);
    };
  }, []);

  function handleDropdownClick(e) {
    setVisibility(!visible);
  }

  return (
    <DropdownContainer ref={referenceRef} onClick={handleDropdownClick}>
      {children}
      <div ref={popperRef} style={styles.popper} {...attributes.popper}>
        <PopverContainer
          style={styles.offset}
          visible={visible}
          onClick={handleClickInsidePopper}
        >
          {popperComponent}
        </PopverContainer>
      </div>
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div``;

const PopverContainer = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
  background-color: #0f2520;
  border-radius: 4px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.14);
  padding: 5px;
`;

export const DropdownButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button,
  a {
    text-align: left;
    display: flex;
    align-items: center;
    width: 100%;
    height: 28px;
    color: white;
    background: none;
    border: none;
    margin: 0 1em;
    cursor: pointer;
    font-size: 18px;
    text-decoration: none;
    padding: 20px 20px;

    &:hover {
      background-color: #0f482f;
      color: white;
      border-radius: 5px;
    }
  }
`;

export default Dropdown;
