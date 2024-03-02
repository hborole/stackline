import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ProductDetails = () => {
  const { product } = useSelector((state: RootState) => state.product);

  return (
    <div className="flex flex-col w-[30%] p-5 card rounded-md shadow-lg">
      <div className="flex justify-center">
        <img src={product.image} alt={product.title} className="w-40 h-40" />
      </div>
      <div className="flex flex-col align-center gap-2 mt-5">
        <h2 className="text-xl text-center font-semibold">{product.title}</h2>
        <p className="text-sm text-center text-gray-500">{product.subtitle}</p>
      </div>
      <hr className="my-5" />
      {product.tags && (
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-1 text-sm border border-solid border-gray-00 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
