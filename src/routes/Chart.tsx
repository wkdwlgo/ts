import React from 'react';
import { useQuery } from 'react-query';
import { fetchCoinHistory} from "../api";
interface ChartProps {
    coinID: string;
    }
function Chart({coinID}:ChartProps) {
    //const{isLoading: priceLoading, data: priceData}=useQuery<PriceData>(['price',coinID], () => fetchPriceData(coinID));
    const {isLoading, data}=useQuery(['ohlcv',coinID],()=> fetchCoinHistory(coinID))
    console.log(data)
    return (
        <>
            <h1>Chart</h1>
        </>
    );
}
export default Chart;