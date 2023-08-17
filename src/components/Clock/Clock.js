import React, {useEffect, useRef, useState} from "react";
import styled, {keyframes} from "styled-components";
import moment from "moment";

function Clock() {
    let timer = null;

    const [time, setTime] = useState(moment());
    const timeTextRef = useRef(null);

    useEffect(() => {
        timer = setInterval(() => {
            setTime(moment());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        const timeText = document.getElementById("timeText");
        timeText.style.opacity = 1;
    }, [time]);

    const formatTime = (time) => {
        const formattedTime = time.format("A hh:mm"); // 시간 형식에 AM/PM 추가
        return formattedTime;
    };

    return (
        <ClockWrapper>
            <TimeText id="timeText" ref={timeTextRef}>{formatTime(time)}</TimeText>
        </ClockWrapper>
    );
}


const ClockWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  padding: 20px;
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const TimeText = styled.div`
  color: #f0f0f0;
  font-size: 130px;
  display: inline-block; /* 영역을 inline-block으로 설정 */
  white-space: nowrap; /* 줄 바꿈 방지 */
  text-align: center; /* 텍스트 가운데 정렬 */
  opacity: 0;
  animation: ${fadeInLeft} 1s forwards;

  @media screen and (max-width: 2000px) {
    font-size: 100px;
  }
`;



export default Clock;
