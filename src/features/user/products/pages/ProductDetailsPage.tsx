import { useParams } from 'react-router';
import { useProduct } from '../hooks/useProducts';
import ProductDetails from '../components/ProductDetails';
import type { Product } from '../api/products.api';

export default function ProductDetailsPage() {
    const { id } = useParams();
    const { data, isLoading } = useProduct();
    const product = data?.find((item: Product) => item.id === id);

    return <ProductDetails product={product} isLoading={isLoading} />;
}
