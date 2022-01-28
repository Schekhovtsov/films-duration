import {Routing} from 'pages';
import React from 'react';
import styled from 'styled-components';
import { withProviders } from './providers';
import { Layout, Menu } from "antd";
const { Header, Footer } = Layout;


function App() {

    const Content = styled.div`
      margin: 50px;
    `

    const Wrapper = styled.div`
      margin: 0 auto;
      width: 100%; // Телефон
      @media (min-width: 990px) {
        width: 90%; // Компьютер
      }
      @media (min-width: 1400px) {
        width: 70%; // Компьютер
      }
    `


    return (

        <Layout >
            <Wrapper>
            <Header>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key={1}>Home</Menu.Item>
                    <Menu.Item key={2}>TOP-250</Menu.Item>
                </Menu>
            </Header>


            <Content>
                <Routing/>
            </Content>

            <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Wrapper>
        </Layout>
    );
}

export default withProviders(App);
