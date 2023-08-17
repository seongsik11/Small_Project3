import React, { useState } from "react";
import styled from "styled-components";

export default function MemoTemplate(props) {
    const { memo, setMemo } = props;
    const [memoTitle, setMemoTitle] = useState("");
    const [memoContent, setMemoContent] = useState("");
    const [savedMemos, setSavedMemos] = useState([]);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showLoadModal, setShowLoadModal] = useState(false);
    const [selectedMemos, setSelectedMemos] = useState([]); // 선택된 메모들의 인덱스를 저장하는 상태
    // const [checkedMemos, setCheckedMemos] = useState({});
    const [btnChange, setBtnChange] = useState("선택");

    const saveModalOpen = () => {
        if (memoContent.trim() !== "") {
            setShowSaveModal(true)
        }
    }

    const loadModalOpen = () => {
        setBtnChange("선택");
        setShowLoadModal(true);
    }

    const onClose = () => {
        setMemo(false);
    };

    const onClear = () => {
        setMemoContent("");
    };

    /*
        메모를 저장하는 기능
    */
    const handleSave = () => {
        if (memoContent.trim() !== "" && memoTitle.trim() !== "") {
            const memo = { title: memoTitle, content: memoContent };
            localStorage.setItem("memo", JSON.stringify(memo));
            setSavedMemos((prevMemos) => [...prevMemos, memo]);
            setShowSaveModal(false);
        }
    };

    /*
         load 모달창에서 저장해놨던 메모 내용들 중에서 해당 메모를
         누를 시 해당 메모내용을 메모장에 출력하는 기능
    */
    const handleMemoClick = (memo) => {
        setMemoContent(memo.content);
        setShowLoadModal(false);
    };


    /*
        load를 누를 때 모달 창에서 저장된 메모들을 map을 이용해 리스트형태로 출력
    */
    const renderSavedMemos = () => {
        if (savedMemos.length === 0) {
            return <div style={{color: "#fff", textAlign: "center"}}>No saved memos</div>;
        }

        return savedMemos.map((memo, index) => (
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}} key={index}>
                {btnChange === "삭제" ?
                    <MemoCheckbox
                        onChange={() => handleToggleMemo(index)}
                        checked={selectedMemos.includes(index)}
                    />
                    :
                    ""
                }
                <SavedMemoItem key={index} onClick={() => handleMemoClick(memo)} btnChange={btnChange}>
                    {memo.title}
                </SavedMemoItem>
            </div>
        ));
    };

    /*
        체크된 메모들을 모아 놓은 배열을 filter로 해당 메모를 삭제하는 기능
    */
    const handleMemoDelete = () => {
        setBtnChange("삭제");
        if (btnChange === "삭제") {
            // 선택된 메모 삭제
            const updatedMemos = savedMemos.filter((memo, index) => {
                return !selectedMemos.includes(index);
            });
            setSavedMemos(updatedMemos);
            setSelectedMemos([]); // 선택된 메모 초기화
        }
    };

    /*
        해당 저장된 메모를 체크했을 때 배열에 담는 함수
    */
    const handleToggleMemo = (index) => {
        const updatedSelectedMemos = [...selectedMemos];
        if (updatedSelectedMemos.includes(index)) {
            // 이미 선택된 메모일 경우 체크 해제
            const memoIndex = updatedSelectedMemos.indexOf(index);
            updatedSelectedMemos.splice(memoIndex, 1);
        } else {
            // 선택되지 않은 메모일 경우 체크
            updatedSelectedMemos.push(index);
        }
        setSelectedMemos(updatedSelectedMemos);
    };

    /*
        저장된 메모들을 전체 삭제하는 기능
    */
    const handleAllMemosDelete = () => {
        // 알림 창을 띄워 사용자에게 확인을 받음
        const confirmDelete = window.confirm("정말 전체 삭제하시겠습니까?");

        if (confirmDelete) {
            // 전체 메모 삭제
            setSavedMemos([]);
        }
    };

    return (
        <Container>
            {memo === true ? (
                <MemoContainer>
                    <BtnBox>
                        <Btn onClick={onClose}>x</Btn>
                        <Box>
                            <Btn onClick={saveModalOpen} style={{ fontSize: "15px", margin: "10px 20px" }}>
                                Save
                            </Btn>
                            {savedMemos.length > 0 && (
                                <Btn onClick={loadModalOpen} style={{ fontSize: "15px", margin: "10px 10px" }}>
                                    Load
                                </Btn>
                            )}
                            <Btn onClick={onClear} style={{ fontSize: "15px", margin: "10px 20px" }}>
                                Clear
                            </Btn>
                        </Box>
                    </BtnBox>
                    <MemoType
                        id="memoInput"
                        value={memoContent}
                        onChange={(e) => setMemoContent(e.target.value)}
                    />
                    {showSaveModal && memoContent.trim() !== "" ?
                        <Modal>
                            <ModalContent style={{overflowY:"hidden"}}>
                                <CloseButton onClick={() => setShowSaveModal(false)}>x</CloseButton>
                                <ModalTitleInput
                                    placeholder="Enter memo title"
                                    value={memoTitle}
                                    onChange={(e) => setMemoTitle(e.target.value)}
                                />
                                <SaveButton onClick={handleSave}>Save</SaveButton>
                            </ModalContent>
                        </Modal>
                        :
                        ""
                    }

                    {showLoadModal && (
                        <Modal>
                            <CloseButton onClick={() => setShowLoadModal(false)}>x</CloseButton>
                            {savedMemos.length > 0 && (
                                <>
                                    <ButtonWrapper>
                                        {btnChange === "선택" ?
                                            <AllDeleteButton onClick={handleAllMemosDelete}>
                                                전체 삭제
                                            </AllDeleteButton>
                                            :
                                            <AllDeleteButton onClick={() => setBtnChange("선택")}>
                                                취소
                                            </AllDeleteButton>
                                        }
                                    </ButtonWrapper>
                                    <ButtonWrapper>
                                        {btnChange === "선택" ?
                                            <Check>선택</Check>
                                            :
                                            <CheckDeleteButton onClick={handleMemoDelete} btnChange={btnChange}>
                                                삭제
                                            </CheckDeleteButton>
                                        }
                                    </ButtonWrapper>
                                </>
                            )}
                            <ModalContent>
                                    {renderSavedMemos()}
                            </ModalContent>
                        </Modal>
                    )}
                </MemoContainer>
            ) : (
                ""
            )}
        </Container>
    );
}

const Container = styled.div`
  position: relative;
  left: -20vw;
  top: -5vw;

  @media screen and (max-width: 2500px) {
    left: -30vw;
    top: -10vw;
  }
`;

const MemoContainer = styled.div`
    position: relative;
    padding: 0 10px;
    width: 400px;
    height: 600px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;

    @media screen and (max-width: 2500px) {
        width: 350px;
        height: 450px;
    }

 
`;

const MemoType = styled.textarea`
  position: absolute;
  width: 94%;
  height: 80%;
  border: none;
  outline: none;
  resize: none;
  background: none;
  font-size: 16px;
  color: #fff;
  border-radius: 8px;
  font-family: "Arial", sans-serif;
`;

const MemoCheckbox = styled.input.attrs({ type: 'checkbox' })`
    margin-left: -7px;
  `;

const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Btn = styled.div`
  margin-top: 5px;
  width: 15px;
  height: 35px;
  color: #fff;
  text-align: center;
  font-size: 22px;
  cursor: pointer;
`;


const SavedMemoItem = styled.div`
  margin-left: ${({btnChange}) => btnChange === "삭제" ? "10px" : ""};
  width: 180px;
  cursor: pointer;
  margin-bottom: 5px;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #c9c9c9;
  border-radius: 4px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const Modal = styled.div`
    position: absolute;
    padding: 0 10px;
    left:0;
    top: 0;
    right:0;
    bottom:0;
    width: 400px;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    z-index: 9999;
    @media screen and (max-width: 2500px) {
        width: 350px;
        height: 450px;
    }
`;

const ModalContent = styled.div`
    width:200px;
    max-width: 200px;
    background: rgba(0, 0, 0, 0.3);
    padding: 20px;
    border-radius: 8px;
    max-height: 80vh;
    overflow-y: auto;
   
`;

const ModalTitleInput = styled.input`
  width: 89%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  transition: box-shadow 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.7);
  }
  
`;


const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: gray;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #007bff;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const AllDeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(211, 51, 51, 0.8);
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #b30000;
  }
`;

const Check = styled.div`
  position: absolute;
  top: 15px;
  right: 90px;
  color: #fff;
  font-size: 12px;
  padding: 2px 8px;
  text-align: center;
  border-bottom: 1px solid #fff;
  cursor: pointer;
  margin-left: 10px;

`;

const CheckDeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 60px;
  background-color: #d33;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #b30000;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 5px;
  left: 12px;
  cursor: pointer;
  font-size: 18px;
  color: #fff;
  font-size: 22px;
`;

