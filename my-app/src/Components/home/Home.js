import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../account/Login";
import { Container, Header, Content, Footer, Panel, Navbar, FlexboxGrid } from 'rsuite';

function Home() {
  const navigate = useNavigate();

  let toRegisterPage = () => {
    navigate("/register");
  };
  return (
      <>
    {/* <div>
    <Link to="/post">Post</Link>
    <Login />
      <h1>
        Dosn't have an account?
        <Link to="/register" onClick={toRegisterPage}>
          Register
        </Link>
      </h1>
    </div> */}
    <div className="show-fake-browser login-page">
    <Container>
      <Header>
        <Navbar appearance="inverse">
          <Navbar.Header>
          <Link to="/post">Post</Link>
          </Navbar.Header>
        </Navbar>
      </Header>
      <Content>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={12}>
            <Panel header={<h3>Login</h3>} bordered>
            <Login />
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
      <Footer>Footer</Footer>
    </Container>
  </div>
      </>
  );
}

export default Home;
