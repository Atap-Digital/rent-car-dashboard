'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { Keuangan } from '@/constants/data';
import { columns } from './columns';
import {
  // KEUANGAN_OPTIONS,
  useKeuanganTableFilters
} from './use-keuangan-table-filters';

export default function KeuanganTable({
  data,
  totalData
}: {
  data: Keuangan[];
  totalData: number;
}) {
  const {
    genderFilter,
    setGenderFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useKeuanganTableFilters();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />

        {/* <DataTableFilterBox
          filterKey="gender"
          title="Gender"
          options=KEUANGAN_OPTIONS}
          setFilterValue={setGenderFilter}
          filterValue={genderFilter}
        /> */}
        {/* <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        /> */}
      </div>
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
