import styled from "styled-components";
import { Link } from "react-router-dom";
const Container =styled.div`
    padding: 0px 20px;

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
    font-size: 5rem;
    color:${(props)=>props.theme.accentColor};
`;

const coins=[
    {
id: "btc-bitcoin",
name: "Bitcoin",
symbol: "BTC",
rank: 1,
is_new: false,
is_active: true,
type: "coin",
},
{
id: "eth-ethereum",
name: "Ethereum",
symbol: "ETH",
rank: 2,
is_new: false,
is_active: true,
type: "coin",
},
{
id: "hex-hex",
name: "HEX",
symbol: "HEX",
rank: 3,
is_new: false,
is_active: true,
type: "token",
},
]

function Coins(){
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            <CoinList>
                {coins.map(coin => <Coin key={coin.id}><Link to={`/${coin.id}`}>{coin.name} &rarr;</Link></Coin>)}
            </CoinList>
        </Container>
    )
}
export default Coins;