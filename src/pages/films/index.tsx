import { Typography } from 'antd';
import { useStore } from 'app/hooks/use-store';
import { Films } from 'entities/films';
import { observer } from 'mobx-react';
import React, { FC, useEffect } from 'react';

const { Title } = Typography;

interface IFilmsPageProps {
  mode: string;
}

export const FilmsPage: FC<IFilmsPageProps> = observer(({ mode }) => {
  const { fetchTopRatedIDs, isInit, wasSearched } = useStore();

  useEffect(() => {
    if (mode === 'top' && !isInit && !wasSearched) {
      fetchTopRatedIDs(3);
    }
  }, []);

  return (
    <div>
      <Title>
        {mode === 'top' && 'TOP Films duration'}
        {mode === 'search' && ''}
      </Title>

      <Films />
    </div>
  );
});
