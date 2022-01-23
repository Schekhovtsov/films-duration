import React, { FC } from 'react';

import {Layout, Menu} from 'antd';
import styled from 'styled-components';
const { Header, Footer } = Layout;

const HomePage: FC = () => {

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
                   content
               </Content>

               <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>

           </Layout>
    );
};

export default HomePage;