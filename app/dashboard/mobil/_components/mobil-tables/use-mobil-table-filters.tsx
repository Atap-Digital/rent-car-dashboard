'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';

export const CATEGORY_OPTIONS = [
  { value: 'Electric', label: 'Electric' },
  { value: 'SUV', label: 'SUV' },
  { value: 'Matic', label: 'Matic' },
  { value: 'Manual', label: 'Manual' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Luxury', label: 'Luxury' }
];
export const STATUS_OPTIONS = [
  { value: 'available', label: 'Tersedia' },
  { value: 'unavailable', label: 'Tidak Tersedia' }
];
export function useProductTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [categoriesFilter, setCategoriesFilter] = useQueryState(
    'categories',
    searchParams.categories.withOptions({ shallow: false }).withDefault('')
  );
  const [statusFilter, setStatusFilter] = useQueryState(
    'status',
    searchParams.statuses.withOptions({ shallow: false }).withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setCategoriesFilter(null);
    setStatusFilter(null);

    setPage(1);
  }, [setSearchQuery, setCategoriesFilter, setStatusFilter, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!categoriesFilter || !!statusFilter;
  }, [searchQuery, categoriesFilter, statusFilter]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    categoriesFilter,
    setCategoriesFilter,
    statusFilter,
    setStatusFilter
  };
}
