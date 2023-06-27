import React from 'react';
import './style.scss';

interface Props<T> {
  data: T[];
  columns: { key: keyof T; title: string; render?: (value: T) => React.ReactNode }[];
}

const Table = <T extends object>({ data, columns }: Props<T>) => {
  return (
    <table className="table">
      <thead className="table_head">
        <tr>
          {columns.map(({ key, title }) => (
            <th key={key as string} className="table_header">
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="table_body">
        {data?.map((item) => (
          <tr key={Math.random()} className="table_row">
            {columns.map(({ key, render }) => (
              <td key={key as string} className="table_cell">
                {render ? render(item) : item[key] as React.ReactNode}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
