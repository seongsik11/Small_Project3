import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components';
import { TiEdit } from 'react-icons/ti';
import MemoTemplate from "./templates/MemoTemplate";

const TodoListTemplateWrapper = styled.main`
  position: absolute;
  top: 62%;
  left: 50%;
  background: rgba(0, 0, 0, 0.2);
  width: 512px;
  height: 335px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 8px;
  transform: translate(-50%, -50%);

  @media (max-width: 2000px) {
    top: 67%;
    left: 50%;
  }
`;

const Title = styled.div`
  padding: 2rem;
  font-size: 2.5rem;
  text-align: center;
  font-weight: 350;
  color: #f2f2f2;
`;

const TodosWrapper = styled.section`
  height: 156px;
  min-height: 5rem;
  overflow-y: auto;
  
  /* WebKit 브라우저용 스크롤 스타일링 */
  &::-webkit-scrollbar {
    width: 0px; /* 스크롤 너비 */
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* 스크롤 색상 */
  }
`;

const HamburgerBtn = styled.div`
    position: absolute;
    right: 35px;
    margin-top: 5px;
    width: 0;
    height: 0;
    font-size: 24px;
    color: #e1e1e1;
    cursor: pointer;
    
    &:hover{
      color: white;
      transition: color 0.3s ease-in-out;
    }
`;

const MemoBtn = styled.div`
    position: absolute;
    margin-top: 8px;
    left: 10px;
    width: 0;
    height: 0;
    font-size: 24px;
    color: #e1e1e1;
    cursor: pointer;
    
    &:hover{
      color: white;
      transition: color 0.3s ease-in-out;
    }
`;

const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: calc(8% + 5px);
  right: 20px;
  display: flex;
  flex-direction: column;
  animation: ${props => (props.isVisible ? slideDown : slideUp)} 0.3s ease-in-out;
  color: #f0f0f0;
  cursor: pointer;
  font-size: 11px;
`;

const ToggleButton = styled.div`
    padding: 5px 2px;
    background: rgba(0, 0, 0, 0.35);
    border-radius: 3px 3px 0 0;
    &:hover{
        background: rgba(0, 0, 0, 0.25);
        transition: background 0.3s ease-in-out;
        color: white;
    }
`;

const RemoveButton = styled.div`
    padding: 5px 2px;
    background: rgba(0, 0, 0, 0.35);
    border-radius: 0 0 3px 3px;
    &:hover{
        background: rgba(0, 0, 0, 0.25);
        transition: background 0.3s ease-in-out;
        color: white;
    }
`;


const TodoListTemplate = ({ form, children, showButtons, setShowButtons, onAllToggle, onAllRemove, memo, setMemo}) => {
    const isVisible = showButtons;



    const handleToggleButtons = () => {
        setShowButtons((prevShowButtons) => !prevShowButtons);
    };

    const handleMemoBtn = () => {
        setMemo(!memo);
    }

    return (
        <TodoListTemplateWrapper>
            <MemoBtn onClick={handleMemoBtn}><TiEdit/></MemoBtn>

            <HamburgerBtn onClick={handleToggleButtons}>☰</HamburgerBtn>
            {isVisible && (
                <ButtonWrapper isVisible={isVisible}>
                    <ToggleButton onClick={onAllToggle}>전체 토글</ToggleButton>
                    <RemoveButton onClick={onAllRemove}>전체 삭제</RemoveButton>
                </ButtonWrapper>
            )}
            <Title>CHECK LIST</Title>
            <section style={{ padding: '1rem', borderBottom: '1px solid #ffffff' }}>
                {form}
            </section>
            <TodosWrapper>{children}</TodosWrapper>
        </TodoListTemplateWrapper>
    );
};


export default TodoListTemplate;
