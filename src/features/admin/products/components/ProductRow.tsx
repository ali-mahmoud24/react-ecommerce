import type { Product } from '../types/product.type';

export default function ProductRow({ product }: { product: Product }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <img src={product.imageCoverUrl ?? ''} alt={product.title} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6 }} />
      <div>
        <div style={{ fontWeight: 600 }}>{product.title}</div>
        <div style={{ color: '#666' }}>{product.category?.name}</div>
      </div>
    </div>
  );
}
