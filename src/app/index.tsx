import React from 'react';
import { Routing } from 'pages';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { withProviders } from './providers';

const { Header, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Wrapper>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key={1}>
              <NavLink to="/">Home</NavLink>
            </Menu.Item>
            <Menu.Item key={2}>
              <NavLink to="/top">TOP Films</NavLink>
            </Menu.Item>
          </Menu>
        </Header>

        <Content>
          <Routing />
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Films Duration © 2022
          <br />
          Created by Schekhovtsov
        </Footer>
      </Wrapper>
    </Layout>
  );
}

export default withProviders(App);

const Content = styled.div`
  margin: 20px 10px;
  @media (min-width: 990px) {
    margin: 30px;
  }
  @media (min-width: 1400px) {
    margin: 50px;
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  @media (min-width: 990px) {
    width: 90%;
  }
  @media (min-width: 1400px) {
    width: 70%;
  }
`;
