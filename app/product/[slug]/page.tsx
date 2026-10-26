import React from 'react';
import { PRODUCTS } from '@/data/products';
import ProductClient from './ProductClient';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  return <ProductClient slug={params.slug} />;
}
