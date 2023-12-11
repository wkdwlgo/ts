import styled from "styled-components";

interface ContainerProps{
    bgColor:string;
    borderColor:string;
}

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${props => props.bgColor};
    border-radius: 100px;
    border: 2px solid ${props=>props.borderColor};
`;

interface CircleProps{
    bgColor:string;
    borderColor?:string;//?: 있을 수도 있고 없을 수도 있다. 
}

function Circle({bgColor,borderColor}:CircleProps){
    return <Container bgColor={bgColor} borderColor={borderColor??"white"}/>
    //만약 borderColor이 undefined라면 white로=> default 값을 줌
}

export default Circle;