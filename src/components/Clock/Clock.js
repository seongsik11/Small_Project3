import React, {useEffect, useState} from "react";
import styled from "styled-components";
import moment from "moment";

function Clock() {

    let timer: any = null;

    const [time, setTime] = useState(moment()); // time default 값  설정

    useEffect(() => {
        timer = setInterval(() => { // timer 변수에 interval 종료를 위해 저장
            setTime(moment()); // 현재 시간 세팅
        }, 1000); // 1000ms = 1초간 반복

        return () => {
            clearInterval(timer); // 함수 unmount 시 clearInterval
        };
    }, [])

    return (
        <div>
            <TimeText>
                {time.format('hh:mm')}
            </TimeText>
        </div>
    )
}

const TimeText = styled.div`
    color: #f2f2f2;
    font-size: 10rem;
    
    @media screen and (max-width: 2000px) {
        font-size: 7rem;
    }
`;

export default Clock;