import { useParams } from 'react-router';
import { useProductByIdQuery } from '../hooks/useProducts';
import ProductDetails from '../components/ProductDetails';

export default function ProductDetailsPage() {
    const { id } = useParams();
    const { data, isLoading } = useProductByIdQuery(id!);

    return <ProductDetails product={data?.data} isLoading={isLoading} />;
}
