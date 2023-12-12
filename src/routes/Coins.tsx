import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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

const CoinList = styled.ul`

`;

const Coin= styled.li`
    background-color: ${(props)=> props.theme.textColor};
    color: ${(props)=> props.theme.bgColor};
    padding:20px;
    border-radius: 15px;
    margin-bottom: 10px;
    a{
        display: block;//이렇게 하면 카드의 끝부분 까지도 클릭 할 수 있음
        display: flex;
        align-items: center;
    }
    &:hover {
        transform: scale(1.1);
        transition: all 1s ease-in;
        a{
            color: ${(props)=> props.theme.accentColor};
        }
    }
    
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
  border: 1px solid #3563e9;
  border-radius: 50%;
  border-top: none;
  border-right: none;
  margin: 10rem auto;
  animation: ${rotation} 1s linear infinite;
`;

const CoinImg = styled.img`
    width: 35px;
    height: 35px;
    margin: 0 10px 0 0 ;
`;

interface CoinInterface{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins(){
    const [coins, setCoins]=useState<CoinInterface[]>([]);
    const [loading, setLoading]=useState(true);
    useEffect(()=>{
        (async()=>{
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json= await response.json();
            setCoins(json.slice(0,100));
            setLoading(false);
        })()
    },[])
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
           {loading ? (
            <Spinner></Spinner>
            ):(
            <CoinList>
                {coins.map((coin) => (<Coin key={coin.id}>
                    <Link to={`/${coin.id}`} state={coin.name}>
                    <CoinImg src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}/>
                    {coin.name} &rarr;</Link></Coin>))}
            </CoinList>
            )}
        </Container>
    )
}
export default Coins;