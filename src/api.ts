
const BASE_URL="https://api.coinpaprika.com/v1"


export async function fetchCoins(){

    return fetch(`${BASE_URL}/coins`).then(response => 
        response.json()
    );
}

export async function fetchInfoData(coinID:string){

    return fetch(`${BASE_URL}/coins/${coinID}`).then(response => 
        response.json()
    );
}

export async function fetchPriceData(coinID:string){

    return fetch(`${BASE_URL}/tickers/${coinID}`).then(response => 
        response.json()
    );
}
// circulating_supply: 19575588 - 현재 유통 중인 비트코인의 공급량입니다.
// total_supply: 19575588 - 비트코인의 총 공급량입니다.
// max_supply: 21000000 - 비트코인의 최대 공급량입니다.
// beta_value: 1.1074 - 베타 값(Beta value)은 자산의 변동성을 나타내는 지표 중 하나입니다.
// first_data_at: "2010-07-17T00:00:00Z" - 해당 데이터의 최초 기록된 일시입니다.
// last_updated: "2023-12-20T14:58:19Z" - 데이터가 마지막으로 업데이트된 일시입니다.
// quotes 객체에는 비트코인의 가격과 관련된 정보가 포함되어 있습니다.
// USD 객체에는 미국 달러(USD)와 관련된 여러 속성들이 들어 있습니다.
// price: 44042.093034278325 - 비트코인의 현재 가격(USD).
// volume_24h: 22369722144.32898 - 지난 24시간 동안의 거래량(USD).
// volume_24h_change_24h: 2.66 - 거래량의 24시간 변동률.
// market_cap: 862149867897 - 시가총액(USD).
// market_cap_change_24h: 3.62 - 시가총액의 24시간 변동률.
// percent_change_15m: 0 - 지난 15분 동안의 가격 변동률.
// percent_change_30m: -0.16 - 지난 30분 동안의 가격 변동률.
// percent_change_1h: 0.53 - 지난 1시간 동안의 가격 변동률.
// percent_change_6h: 2.76 - 지난 6시간 동안의 가격 변동률.
// percent_change_12h: 3.65 - 지난 12시간 동안의 가격 변동률.
// percent_change_24h: 3.61 - 지난 24시간 동안의 가격 변동률.
// percent_change_7d: 5.05 - 지난 7일 동안의 가격 변동률.
// percent_change_30d: 17.97 - 지난 30일 동안의 가격 변동률.
// percent_change_1y: 159.32 - 지난 1년 동안의 가격 변동률.
// ath_price: 68692.13703693185 - 역대 최고 가격(USD).
// ath_date: "2021-11-10T16:50:00Z" - 역대 최고 가격이 기록된 일시.
// percent_from_price_ath: -35.88 - 현재 가격이 역대 최고 가격 대비 얼마나 낮은지를 나타내는 백분율.

export function fetchCoinHistory(coinID: string){
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinID}`).then(response => 
    response.json()
);
}