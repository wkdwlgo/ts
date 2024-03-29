import React from 'react';
import { PriceData } from './Coin';
import styled, { keyframes } from "styled-components";

interface PriceProps {
    priceData: PriceData;
  }
  //위 의 코드 없을 때는 Price 컴포넌트에서 {priceData}: PriceData와 같이 작성되어 있습니다. 하지만 이 부분은 PriceData를 가져오는 것이 아니라 PriceData 타입의 객체에서 priceData라는 속성을 가져오려는 시도로 해석
  //위 코드가 있다면 Price 컴포넌트가 정확한 타입의 props를 받아올 수 있습니다. 
interface ItemProps{
    isPositive: Boolean;
}

const PriceContainer= styled.div`
   
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    div{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1.2rem;
        border: solid 2px ${(props)=>props.theme.accentColor};
        background-color: ${(props)=> props.theme.textColor};
        color: ${(props)=> props.theme.bgColor};
        padding: 0.7rem 1.3rem;
        border-radius: 15px;
    }
    @media (min-width: 992px){  
    height: 340px;
    
    }
    @media (max-width:992px) {
        div{
            margin-bottom: 1rem;
        }
    }
`;

const PriceValue=styled.span<ItemProps>`
    color:${(props)=>props.isPositive ? props.theme.upwardColor: props.theme.downwardColor};
`;

function checkBoolean(value:number){
    if(Math.sign(value)===1){
        return true;
    }
    else{
        return false;
    }
}

function Price({priceData}:PriceProps) {
    //console.log(priceData)
    return (
        <PriceContainer>
            <div>
                <span>24 HOUR</span>
                <PriceValue isPositive={checkBoolean(priceData.quotes.USD.percent_change_24h)}>{`${priceData.quotes.USD.percent_change_24h}%`}</PriceValue>
            </div>
            <div>
                <span>7 DAY</span>
                <PriceValue isPositive={checkBoolean(priceData.quotes.USD.percent_change_7d)}>{`${priceData.quotes.USD.percent_change_7d}%`}</PriceValue>
            </div>
            <div>
                <span>1 MONTH</span>
                <PriceValue isPositive={checkBoolean(priceData.quotes.USD.percent_change_30d)}>{`${priceData.quotes.USD.percent_change_30d}%`}</PriceValue>
            </div>
            <div>
                <span>1 YEAR</span>
                <PriceValue isPositive={checkBoolean(priceData.quotes.USD.percent_change_1y)}>{`${priceData.quotes.USD.percent_change_1y}%`}</PriceValue>
            </div>
            <div>
                <span>24시간 거래 변동률</span>
                <PriceValue isPositive={checkBoolean(priceData.quotes.USD.volume_24h_change_24h)}>{`${priceData.quotes.USD.volume_24h_change_24h}%`}</PriceValue>
            </div>
            <div >
                <span>24시간 시가총액(USD) 변동률</span>
                <PriceValue isPositive={checkBoolean(priceData.quotes.USD.market_cap_change_24h)}>{`${priceData.quotes.USD.market_cap_change_24h}%`}</PriceValue>
            </div>
        </PriceContainer>
    );
}

export default Price;