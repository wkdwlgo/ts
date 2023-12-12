import { useParams } from 'react-router';

interface Params {
coinID: String;
}

function Coin() {
const { coinID } = useParams() as unknown as Params;
console.log(coinID);
return <h1>Coin : {coinID}</h1>;
}
export default Coin;