import React from 'react';
import ContentLoader from 'react-content-loader';
import styled from 'styled-components';

function Preloader() {
  const Wrapper = styled.div`
        background-color: white;
    `;

  return (
    <Wrapper>
      <ContentLoader
        speed={2}
        width="100%"
        height="640px"
        backgroundColor="#d9d9d9"
        foregroundColor="#ededed"
      >
        <rect x="0" y="0" rx="4" ry="4" width="100%" height="70" />
        <rect x="0" y="80" rx="4" ry="4" width="100%" height="70" />
        <rect x="0" y="160" rx="4" ry="4" width="100%" height="70" />
        <rect x="0" y="240" rx="4" ry="4" width="100%" height="70" />
        <rect x="0" y="320" rx="4" ry="4" width="100%" height="70" />
        <rect x="0" y="400" rx="4" ry="4" width="100%" height="70" />
        <rect x="0" y="480" rx="4" ry="4" width="100%" height="70" />
        <rect x="0" y="560" rx="4" ry="4" width="100%" height="70" />
        <rect x="0" y="720" rx="4" ry="4" width="100%" height="70" />
        <rect x="0" y="800" rx="4" ry="4" width="100%" height="70" />
      </ContentLoader>
    </Wrapper>
  );
}

export default Preloader;
