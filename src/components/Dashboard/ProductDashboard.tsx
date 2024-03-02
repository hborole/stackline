import { useState } from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch, RootState } from '../../store';
import { sortSales } from '../../store/product';

const COLUMNS: { title: string; name: string }[] = [
  { title: 'Week Ending', name: 'weekEnding' },
  { title: 'Retail Sales', name: 'retailSales' },
  { title: 'Wholesale Sales', name: 'wholesaleSales' },
  { title: 'Units Sold', name: 'unitsSold' },
  { title: 'Retailer Margin', name: 'retailerMargin' },
];

const ProductDashboard = () => {
  const dispatch = useAppDispatch();
  const { sortedSales } = useSelector((state: RootState) => state.product);

  const [sortField, setSortField] = useState('');
  const [order, setOrder] = useState('asc');

  const handleSort = (name: string) => {
    setSortField(name);
    setOrder((order) => (order === 'asc' ? 'desc' : 'asc'));
    dispatch(sortSales({ sortField, order }));
  };

  return (
    <div className="flex flex-1 p-2 card rounded-md shadow-lg text-slate-500 overflow-y">
      <table className="flex-1 uppercase table-auto overflow-scroll w-full">
        <thead>
          <tr className="w-[100%] ">
            {COLUMNS.map((column, index) => (
              <th
                key={index}
                className="px-2 py-2 w-[20%] text-sm font-bold text-[#333]"
                onClick={() => handleSort(column.name)}
              >
                {column.title}&nbsp;&darr;
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedSales?.map((sale, index) => (
            <tr className="w-[100%] text-center" key={index}>
              <td className="px-4 py-2 w-[20%]">
                {new Date(sale.weekEnding)
                  .toLocaleDateString()
                  .replace(/\//g, '-')}
              </td>
              <td className="px-4 py-2 w-[20%]">
                {'$' +
                  sale.retailSales
                    .toFixed(0)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </td>
              <td className="px-4 py-2 w-[20%]">
                {'$' +
                  sale.wholesaleSales
                    .toFixed(0)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </td>
              <td className="px-4 py-2 w-[20%]">{sale.unitsSold}</td>
              <td className="px-4 py-2 w-[20%]">
                {'$' +
                  sale.retailerMargin
                    .toFixed(0)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductDashboard;
