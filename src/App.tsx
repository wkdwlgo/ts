
import styled from "styled-components";

const Contatiner =styled.div`
  background-color: ${props => props.theme.bgColor};
`;

const H1=styled.h1`
  color: ${props => props.theme.textColor};
`;
function App() {
  
  return (
    <Contatiner>
      <H1>난 짱이다잉</H1>
    </Contatiner>
  );
}

export default App;
