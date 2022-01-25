import React, { FC, useState } from 'react';
import {Table} from 'antd';

interface ITableProps {
    columns: any,
    data: any,
}



export const FilmsTable: FC <ITableProps> = ( {columns, data} ) => {

    const topPaginator = 'topLeft';
    const bottomPaginator = 'bottomRight';

    return (
        <div>
            <Table columns={columns}
                   dataSource={data}
                   pagination={{ position: [topPaginator, bottomPaginator] }}
            />
        </div>
    );
};