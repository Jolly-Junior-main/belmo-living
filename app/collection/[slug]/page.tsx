import React from 'react';
import { COLLECTIONS } from '@/data/collections';
import CollectionClient from './CollectionClient';

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({
    slug: c.slug,
  }));
}

export default function CollectionDetailPage({ params }: { params: { slug: string } }) {
  return <CollectionClient slug={params.slug} />;
}
