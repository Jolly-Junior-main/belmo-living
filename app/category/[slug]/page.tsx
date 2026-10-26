import React from 'react';
import { CATEGORIES } from '@/data/categories';
import CategoryClient from './CategoryClient';

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    slug: c.slug,
  }));
}

export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
  return <CategoryClient slug={params.slug} />;
}
