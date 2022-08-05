import Main from "./pages/Main";
import Header from "./components/Header";
import { Container } from "@mui/material";

function App() {
  return (
    <>
      <Header />
      <Container>
        <Main />
      </Container>
    </>
  );
}

export default App;
