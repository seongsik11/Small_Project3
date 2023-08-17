import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";

export default function Calculator({ setClose }) {
    const [input, setInput] = useState("");
    const [result, setResult] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const calculatorRef = useRef(null);

    const handleKeyPress = (event) => {
        const key = event.key;

        if (/[0-9./*+-]/.test(key)) {
            handleNumberClick(key);
        } else if (key === "=" || key === "Enter") {
            handleEqualClick();
        }
    };

    const handleNumberClick = (number) => {
        setInput((prevInput) => prevInput + number);
    };

    const handleOperatorClick = (operator) => {
        if (input !== "") {
            setInput((prevInput) => prevInput + operator);
        }
    };

    const handleEqualClick = () => {
        if (input !== "") {
            try {
                const calculatedResult = eval(input);
                setResult(calculatedResult);
            } catch (error) {
                setResult("Error");
            }
        }
    };

    const handleCloseClick = () => {
        setClose(false);
    };

    const handleClearClick = () => {
        setInput("");
        setResult(0);
    };


    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key;
            const operators = ["/", "*", "-", "+"];

            if (/[0-9]/.test(key)) {
                handleNumberClick(key);
            } else if (operators.includes(key)) {
                handleOperatorClick(key);
            } else {
                switch (key) {
                    case "=":
                    case "Enter":
                        handleEqualClick();
                        break;
                    case "Backspace":
                        setInput((prevInput) => prevInput.slice(0, -1));
                        break;
                    case "Escape":
                        handleClearClick();
                        break;
                    default:
                        break;
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [input]);



    // useEffect(() => {
    //     const handleMouseMove = (e) => {
    //         if (!isDragging) return;
    //
    //         const { clientX, clientY } = e;
    //         const offsetX = clientX - dragOffset.x;
    //         const offsetY = clientY - dragOffset.y;
    //
    //         calculatorRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    //     };
    //
    //     const handleMouseUp = () => {
    //         setIsDragging(false);
    //         calculatorRef.current.style.transform = "none";
    //     };
    //
    //     document.addEventListener("mousemove", handleMouseMove);
    //     document.addEventListener("mouseup", handleMouseUp);
    //
    //     return () => {
    //         document.removeEventListener("mousemove", handleMouseMove);
    //         document.removeEventListener("mouseup", handleMouseUp);
    //     };
    // }, [isDragging, dragOffset]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        const { clientX, clientY } = e;
        const rect = calculatorRef.current.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const offsetY = clientY - rect.top;

        setDragOffset({ x: offsetX, y: offsetY });
    };
    const renderButton = (value, onClickHandler) => (
        <Button key={value} onClick={onClickHandler}>
            {value}
        </Button>
    );

    return (
        <CalculatorWrapper
            // ref={calculatorRef}
            // style={{ transform: isDragging ? "translateZ(0)" : "none" }}
            // onMouseDown={handleMouseDown}
        >
            <button className="close-button" onClick={handleCloseClick}>
                X
            </button>
            <Input type="text" value={input} disabled />
            <ButtonRow>
                {[7, 8, 9, "/"].map((value) =>
                    renderButton(value, () => handleNumberClick(value))
                )}
            </ButtonRow>
            <ButtonRow>
                {[4, 5, 6, "*"].map((value) =>
                    renderButton(value, () => handleNumberClick(value))
                )}
            </ButtonRow>
            <ButtonRow>
                {[1, 2, 3, "-"].map((value) =>
                    renderButton(value, () => handleNumberClick(value))
                )}
            </ButtonRow>
            <ButtonRow>
                {[0, ".", "=", "+"].map((value) =>
                    renderButton(value, () =>
                        value === "="
                            ? handleEqualClick()
                            : value === "."
                                ? handleNumberClick(value)
                                : handleOperatorClick(value)
                    )
                )}
            </ButtonRow>
            <ButtonRow>
                {renderButton("Clear", handleClearClick)}
            </ButtonRow>
            <Result>Result: {result}</Result>
        </CalculatorWrapper>
    );
}

const CalculatorWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .close-button {
    position: absolute;
    top: 5px;
    right: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #e8254e;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 10px;
    color: white;
    border: none;
    outline: none;
    transition: background-color 0.3s;

    &:hover {
        background-color: #ba1336;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 24px;
  text-align: right;
  border: none;
  border-radius: 4px;
  background-color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;

  &:hover {
    background-color: #333;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px 20px;
  font-size: 18px;
  color: #fff;
  background-color: #4c4c4c;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  font-family: "Digital", sans-serif;
  transition: background-color 0.3s;
  &:hover {
    background-color: #333;
  }
`;

const Result = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-top: 20px;
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: right;
  font-family: "Digital", sans-serif;
`;
