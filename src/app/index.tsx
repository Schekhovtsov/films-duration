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

    return (

        <Layout>

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

        </Layout>
    );
}

export default withProviders(App);
