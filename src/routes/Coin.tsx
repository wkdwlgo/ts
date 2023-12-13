import { useState, useEffect } from 'react';
import { useParams, useLocation, } from 'react-router';
import styled, { keyframes } from "styled-components";

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