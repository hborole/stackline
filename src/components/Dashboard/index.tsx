import { useEffect } from 'react';
import ProductDashboard from './ProductDashboard';
import ProductDetails from './ProductDetails';

import { useAppDispatch } from '../../store';

import { getProduct } from '../../store/product';

export default function Dashboard() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch product data
    const fetchProduct = async () => {
      try {
        await dispatch(getProduct());
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [dispatch]);

  return (
    <div className="m-10">
      <div className="flex justify-center align-center gap-4 h-[100%]">
        <ProductDetails />
        <ProductDashboard />
      </div>
    </div>
  );
}
