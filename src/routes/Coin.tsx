import { useState, useEffect , } from 'react';
import { useParams, useLocation, } from 'react-router';
import { BrowserRouter as Router, Routes, Route ,Outlet, Link,useMatch } from 'react-router-dom';
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Chart from './Chart';
import Price from './Price';
import { fetchInfoData, fetchPriceData} from "../api";
import { useQuery } from 'react-query';
import {Helmet} from "react-helmet";
interface RouteParams {
coinID: string;
}

interface RouteState {
    state:string;
}

interface InfoData{
    id :string;
    name :string;
    symbol :string;
    rank :number;
    is_new :boolean;
    is_active :boolean;
    type :string;
    logo :string;
    description :string;
    message :string;
    open_source :boolean;
    started_at :string;
    development_status :string;
    hardware_wallet :boolean;
    proof_type :string;
    org_structure :string;
    hash_algorithm :string;
    first_data_at :string;
    last_data_at :string;
    links:{
        explorer: string[];
        facebook: string[];
        reddit: string[];
        source_code: string[];
        website: string[];
        youtube: string[];
    };
}

interface PriceData{
    id: string;
    name:     string;
    symbol:     string;
    rank:     number;
    circulating_supply:     number;
    total_supply:     number;
    max_supply:     number;
    beta_value:     number;
    first_data_at:     string;
    last_updated:     string;
    quotes:  {
        USD:    {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number
        }
    };
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

const TotalBox=styled.div`
    background-color: ${(props)=> props.theme.textColor};
    color: ${(props)=> props.theme.bgColor};
    padding:15px 20px;
    border-radius: 15px;
    margin-bottom: 1.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.3rem;
    text-align: center;
    border: solid 2px ${(props)=>props.theme.accentColor};
        span{
            .total__title{
                font-size: 0.7rem;
                padding-bottom: 0.4rem;
            }
        }
`;

const InforBox=styled.div`
    background-color: ${(props)=> props.theme.textColor};
    color: ${(props)=> props.theme.bgColor};
    border-radius: 15px;
    padding:20px 20px 15px 20px;
    margin-bottom: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: solid 2px ${(props)=>props.theme.accentColor};
    .inforBox__ul{
        
        li{
            display: flex;
            align-items: center;
            padding-bottom: 0.25rem;
            a{
                display: flex;
                padding-right: 0.3rem;
                .a__fontawsome{
                    font-size: 1.2rem;
                }
                .youtube__icon{
                    font-size: 1.27rem;
                }
            }
            
        }
    }
   
`;

const CoinImg = styled.img`
    width: 70px;
    height: 70px;
    margin: 0 20px 0 0 ;
`;

const Tabs= styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab= styled.span<{isActive:boolean}>`
    text-align: center;
    font-size: 1.1rem;
    
    padding:8px 13px;
    border-radius: 13px;
    margin-bottom: 0.5rem;
    border: solid 2px ${(props)=>props.theme.accentColor};
    background-color: ${(props)=> props.theme.textColor};
    color: ${props=> props.isActive ? props.theme.accentColor : props.theme.bgColor};
        a{
            display: block;
        }
        &:hover {
        transform: scale(1.05);
        transition: all 1s ease-in;
        
    }
`;


function Coin() {
const { coinID } = useParams() as unknown as RouteParams;
const {state} = useLocation() as RouteState;
const priceMatch = useMatch("/:coinId/price");
const chartMatch = useMatch("/:coinId/chart");
const{/*3*/isLoading: infoLoading, data: inforData}=useQuery<InfoData>(/*1*/['info',coinID],/*2*/ () => fetchInfoData(coinID));
const{isLoading: priceLoading, data: priceData}=useQuery<PriceData>(['price',coinID], () => fetchPriceData(coinID),{
    refetchInterval:5000,
});

// const [loading, setLoading]= useState(true);
// const [coinInfoData, setCoinInfoData]=useState<InfoData>();//TS가 뭐가 뭔지 다 아니깐 ()안에 {} 다 지워주자.
// const [coinPriceData, setCoinPriceData]=useState<PriceData>();
// console.log(priceMatch)
//     useEffect(()=>{
//         (async()=>{
//             const infoData = await((await fetch(`https://api.coinpaprika.com/v1/coins/${coinID}`))).json();
//             const priceData= await((await fetch(`https://api.coinpaprika.com/v1/tickers/${coinID}`))).json();
//             setCoinInfoData(infoData);
//             setCoinPriceData(priceData);
//             setLoading(false);
//         })()
//     },[coinID])//coinID가 변경되면 useEffect 다시 실행함. [] 이렇게 입력하면 hook에 좋지 않다.

const loading=infoLoading || priceLoading;
return (
    <Container>
            <Helmet>
                <title>{state ? state: loading ? "Loading" :inforData?.name }</title>
                
            </Helmet>
            <Header>
                <Title>{state ? state: loading ? "Loading" :inforData?.name }</Title>
            </Header>
           {loading ? (
            <Spinner/>
            )
            :( 
                <>
                    <InforBox>
                    <CoinImg src={`https://cryptocurrencyliveprices.com/img/${coinID}.png`}/>
                    <ul className='inforBox__ul'>
                        <li>
                            <p>{inforData?.name}</p>
                        </li>
                        <li>
                            <p>Started at {inforData?.started_at ? inforData.started_at.slice(0,7).replace('-','.') : 'N/A'}</p>
                        </li>
                        <li>
                            <p>{inforData?.description}</p>
                        </li>
                        <li>
                            <a href={`${inforData?.links.website?.[0]}`}><FontAwesomeIcon icon={faHouse} className='a__fontawsome' /></a>
                            <a href={`${inforData?.links.facebook?.[0]}`}><FontAwesomeIcon icon={faFacebook} className='a__fontawsome' /></a>
                            <a href={`${inforData?.links.youtube?.[0]}`}><FontAwesomeIcon icon={faYoutube} className='a__fontawsome youtube__icon' /></a>
                        </li>
                    </ul>
                    </InforBox>
                    
                    <TotalBox>
                        <span>
                            <p className='total__title'>RANK:</p>
                            <p>{inforData?.rank}</p>
                        </span>
                        <span>
                            <p className='total__title'>SYMBOL:</p>
                            <p>{inforData?.symbol}</p>
                        </span>
                        <span>
                            <p className='total__title'>PRICE:</p>
                            <p>${priceData?.quotes.USD.price.toFixed(3)}</p>
                        </span>
                    </TotalBox>
                    
                    <TotalBox>
                        <span>
                            <p className='total__title'>TOTAL SUPPLY:</p>
                            <p>{priceData?.total_supply}</p>
                        </span>
                        <span>
                            <p className='total__title'>MAX SUPPLY:</p>
                            <p>{priceData?.max_supply}</p>
                        </span>
                    </TotalBox>
                    <Tabs> 
                        <Tab isActive={chartMatch!==null}>
                            <Link to={`/${coinID}/chart`}>CHART</Link>
                        </Tab>
                        <Tab isActive={priceMatch!==null}>
                            <Link to={`/${coinID}/price`}>PRICE</Link>
                        </Tab>
                    </Tabs>
                    <Routes>
                        <Route path="chart" element={<Chart coinID={coinID!}/>} />
                        <Route path="price" element={<Price />} />
                    </Routes>
                </>
            )}
    </Container>
    
)
}
export default Coin;