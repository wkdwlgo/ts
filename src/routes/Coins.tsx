import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import {Helmet} from "react-helmet";


const Container =styled.div`
    margin: 0 auto;
    max-width: 480px;
    padding: 0px 20px;
    width: 100%;
    @media (min-width: 992px) {
        max-width: 1300px;
    }

`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.5rem 0;
    @media (min-width: 992px) {
        
    }

`;

const CoinList = styled.ul`

     @media (min-width: 992px) {
        display: grid;
        grid-template-columns: repeat(5,1fr);
        grid-template-rows: repeat(20,1fr);
        gap: 13px;
     }
`;

const Coin= styled.li`
    border: solid 2px ${(props)=> props.theme.accentColor};
    background-color: ${(props)=> props.theme.textColor};
    color: ${(props)=> props.theme.bgColor};
    padding:20px;
    border-radius: 15px;
    margin-bottom: 10px;
    
    a{
        display: block;//이렇게 하면 카드의 끝부분 까지도 클릭 할 수 있음
        display: flex;
        align-items: center;
        justify-content: space-between;
        div{
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: 1rem;
            font-size: 1.4rem;
        }
        .Coin__div__rank{
            padding-right: 1.3rem;
        }
        .Coin__div__sym{
            padding-left: 0.5rem;
            font-size: 1rem;
            color:#86888a;
        }
       
    }
    &:hover {
        transform: scale(1.1);
        transition: all 1s ease-in;
        a{
            color: ${(props)=> props.theme.accentColor};
        }
    }
    @media (min-width: 992px) {
        display: flex;
        align-items: center;
        justify-content: center;
        a{
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .Coin__arrow{
                display: none;
            }
            div{
                padding: 0;
                text-align: center;
                flex-direction: column;
                justify-content: center;
                gap: 5px;
                
            }
            .Coin__div__rank{
                display: none;
            }
            .Coin__div__sym{
                padding: 0;
            }
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
  border: 1px solid ${(props)=> props.theme.accentColor};
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
    @media (min-width: 992px) {
        width: 50px;
        height: 50px;
        margin: 0 0 10px 0 ;
    }
`;

interface ICoin{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins(){
    const {isLoading, data}=useQuery<ICoin[]>("allCoins", fetchCoins)
    // const [coins, setCoins]=useState<CoinInterface[]>([]);
    // const [loading, setLoading]=useState(true);
    // useEffect(()=>{
    //     (async()=>{
           
    //         setCoins(json.slice(0,100));
    //         setLoading(false);
    //     })()
    // },[])
    return (
        <Container>
            <Helmet>
                
                <title>CCOINFOR</title>
            </Helmet>
            <Header>
                <button >toggle</button>
                <Title>CCOINFOR</Title>
                <div></div>
            </Header>
           {isLoading ? (
            <Spinner></Spinner>
            ):(
            <CoinList>
                {data?.slice(0,100).map((coin) => (<Coin key={coin.id}>
                    <Link to={`/${coin.id}`} state={coin.name}>
                    <div className="Coin__div"><span className="Coin__div__rank">{coin.rank}</span>
                    <CoinImg src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}/>
                     {coin.name} <span className="Coin__div__sym">{coin.symbol}</span></div> <div className="Coin__arrow">&rarr;</div></Link></Coin>))}
            </CoinList>
            )}
        </Container>
    )
}
export default Coins;