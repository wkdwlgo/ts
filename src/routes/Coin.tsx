import { useState, useEffect } from 'react';
import { useParams, useLocation, } from 'react-router';
import styled, { keyframes } from "styled-components";

interface RouteParams {
coinID: string;
}

interface RouteState {
    state:string;
}

const Container =styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Title=styled.h1`
    font-size: 3rem;
    color:${(props)=>props.theme.accentColor};
`;

const rotation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.div`
  height: 5rem;
  width: 5rem;
  border: 1px solid ${(props)=>props.theme.accentColor};
  border-radius: 50%;
  border-top: none;
  border-right: none;
  margin: 10rem auto;
  animation: ${rotation} 1s linear infinite;
`;

function Coin() {
const [loading, setLoading]= useState(true);
const { coinID } = useParams() as unknown as RouteParams;
const {state} = useLocation() as RouteState;
const [coinInfoData, setCoinInfoData]=useState({});
const [coinPriceData, setCoinPriceData]=useState({});
    useEffect(()=>{
        (async()=>{
            const infoData = await((await fetch(`https://api.coinpaprika.com/v1/coins/${coinID}`))).json();
            const priceData= await((await fetch(`https://api.coinpaprika.com/v1/tickers/${coinID}`))).json();
            setCoinInfoData(infoData);
            setCoinPriceData(priceData);
            setLoading(false);
        })()
    },[])

return (
    <Container>
            <Header>
                <Title>{state ? state: "Loading"}</Title>
            </Header>
           {loading ? (
            <Spinner/>
            ):(null)}
    </Container>
)
}
export default Coin;