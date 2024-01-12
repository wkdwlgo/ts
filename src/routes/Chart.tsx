import React from 'react';
import { useQuery } from 'react-query';
import { fetchCoinHistory} from "../api";
import ApexCharts from 'react-apexcharts';
import styled, { keyframes } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from '../atoms';

interface ChartProps {
    coinID: string;
   
    }
interface Ohlcv {
    close: string;
    high: string;
    low: string;
    market_cap: number;
    open: string;
    time_close: number;
    time_open: number;
    volume: string;
}

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

const ChartContainer=styled.div`
    border-radius: 15px;
    color:${(props)=>props.theme.accentColor};
`;

function Chart({coinID}:ChartProps,) {
    //const{isLoading: priceLoading, data: priceData}=useQuery<PriceData>(['price',coinID], () => fetchPriceData(coinID));
    const {isLoading, data}=useQuery<Ohlcv[]>(['ohlcv',coinID],()=> fetchCoinHistory(coinID))
    const isDark= useRecoilValue(isDarkAtom);
    //console.log(data)
    return (
        <>
            <ChartContainer>
                {isLoading ? (<Spinner/>):(<ApexCharts type='candlestick' options={{
                    theme:{
                        mode:isDark? "dark":'light',
                    },
                    chart:{
                        
                            height:700,
                            width:700,
                            

                        
                            toolbar:{
                                show:false,
                            },
                    },
                   
                    stroke:{
                        
                        curve:"smooth",
                        width:3,
                        colors:['#fbc531'],
                    },
                    yaxis:{
                        show:false,
                    },
                    xaxis:{
                        labels:{
                            show:false,
                            datetimeFormatter: {month: "mmm 'yy"},
                        },
                        axisTicks:{
                            show:false,
                        },
                        categories:data?.map(price => new Date(price.time_close * 1000).toISOString()) ?? [],
                        type:"datetime",
    
                    },
                    
                    tooltip: {
                        y: {
                          formatter: (value) => `$${value.toFixed(3)}`,
                        },
                      },
                    colors: ['#fbc531'],
                    plotOptions: {
                        candlestick: {
                          colors: {
                            upward: '#e94f6b',
                            downward: '#4996d2'
                          }
                        }
                      }
                }}
                
                series={[
                    // {   
                    //     name:"price",
                    //     data: data?.map((price) => parseFloat(price.close)) ?? []// close: string; 때문에 형변환해주기!
                    // },
                    {
                        data: 
                          data?.map((price) => {
                            return [
                              price.time_close,
                              parseFloat(price.open),
                              parseFloat(price.high),
                              parseFloat(price.low),
                              parseFloat(price.close),
                            ];
                          }) ?? [],
                      },
                ]} 
                

                />)}
            </ChartContainer>
        </>
    );
}
export default Chart;