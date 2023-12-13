import { useState, useEffect } from 'react';
import { useParams, useLocation, } from 'react-router';
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
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
        explorer:object;
        facebook:object;
        reddit:object;
        source_code:object;
        website:object;
        youtub:object;
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
    padding:20px;
    border-radius: 15px;
    margin-bottom: 1.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const InforBox=styled.div`
    background-color: ${(props)=> props.theme.textColor};
    color: ${(props)=> props.theme.bgColor};
    border-radius: 15px;
    padding:20px;
    margin-bottom: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

`;

const CoinImg = styled.img`
    width: 35px;
    height: 35px;
    margin: 0 10px 0 0 ;
`;


function Coin() {
const [loading, setLoading]= useState(true);
const { coinID } = useParams() as unknown as RouteParams;
const {state} = useLocation() as RouteState;
const [coinInfoData, setCoinInfoData]=useState<InfoData>();//TS가 뭐가 뭔지 다 아니깐 ()안에 {} 다 지워주자.
const [coinPriceData, setCoinPriceData]=useState<PriceData>();
    useEffect(()=>{
        (async()=>{
            const infoData = await((await fetch(`https://api.coinpaprika.com/v1/coins/${coinID}`))).json();
            const priceData= await((await fetch(`https://api.coinpaprika.com/v1/tickers/${coinID}`))).json();
            console.log(infoData)
            console.log(priceData)
            setCoinInfoData(infoData);
            setCoinPriceData(priceData);
            setLoading(false);
        })()
    },[coinID])//coinID가 변경되면 useEffect 다시 실행함. [] 이렇게 입력하면 hook에 좋지 않다.

return (
    <Container>
            <Header>
                <Title>{state ? state: loading ? "Loading" :coinInfoData?.name }</Title>
            </Header>
           {loading ? (
            <Spinner/>
            )
            :( 
                <>
                    <InforBox>
                    <CoinImg src={`https://cryptocurrencyliveprices.com/img/${coinID}.png`}/>
                    <ul className=''>
                        <li>{coinInfoData?.name}</li>
                        <li>{coinInfoData?.symbol}</li>
                        <li>{coinInfoData?.started_at.slice(0,7).replace('-','.')}</li>
                        <li>{coinInfoData?.description}</li>
                        <li></li>
                    </ul>
                    </InforBox>
                    
                    <TotalBox>
                        <span>
                            <p>RANK:</p>
                            <p>{coinInfoData?.rank}</p>
                        </span>
                        <span>
                            <p>SYMBOL:</p>
                            <p>{coinInfoData?.symbol}</p>
                        </span>
                        <span>
                            <p>OPEN SOURCE:</p>
                            <p>{coinInfoData?.open_source ? 'YES' : 'No'}</p>
                        </span>
                    </TotalBox>
                </>
            )}
    </Container>
)
}
export default Coin;