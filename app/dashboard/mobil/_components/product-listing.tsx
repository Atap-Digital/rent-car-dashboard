import { Product } from '@/constants/data';
import { fakeProducts } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns';

import ProductGrid from './product-grids/product-grid';
type ProductListingPage = { viewMode: 'grid' | 'table' };

export default async function ProductListingPage({
  viewMode
}: ProductListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const data = await fakeProducts.getProducts(filters);
  const totalProducts = data.total_products;
  const products: Product[] = data.products;

  if (viewMode === 'grid') {
    return <ProductGrid products={products} />;
  } else if (viewMode === 'table') {
    return (
      <ProductTable
        columns={columns}
        data={products}
        totalItems={totalProducts}
      />
    );
  } else {
    return null;
  }
}
