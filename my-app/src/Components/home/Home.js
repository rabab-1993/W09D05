import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Header,
  Content,
  Footer,
  Panel,
  Navbar,
  FlexboxGrid,
} from "rsuite";
import Nav from "../header/Nav";
import Post from "../post/Post";
function Home() {
  return (
    <>
      <div className="show-fake-browser login-page">
        <Container>
          <Header>
            <Navbar appearance="inverse">
              <Navbar.Header>
                <Nav />
              </Navbar.Header>
            </Navbar>
          </Header>
          <Content>
            <FlexboxGrid justify="center">
              <FlexboxGrid.Item colspan={12}>
                <Panel header={<h3>Home page</h3>} bordered>
                  <Post />
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
