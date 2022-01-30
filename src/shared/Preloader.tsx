import React from 'react';
import styled from 'styled-components';

const Preloader = () => {

    const Preloader = styled.div`
        width: 300px;
        height: 300px;
        background-color: white;
    `;

    return (
        <div>
            Loading...
        </div>
    );
};

export default Preloader;