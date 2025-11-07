import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Stack, Button, IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';
import useDebounce from '@/hooks/useDebounce';
import PageContainer from './PageContainer';
import { getBrandColumns } from './BrandColumns';
import { usePaginatedBrandsQuery, useDeleteBrandMutation } from '../hooks/useBrands';
import type { Brand } from '../types/brand.type';
import type { GridFilterModel, GridRowParams, GridSortModel } from '@mui/x-data-grid';

import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import BrandsGrid from './BrandsGrid';

export default function UsersTable() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });

  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 300);

  const [deleteTarget, setDeleteTarget] = useState<Brand | null>(null);

  const page = paginationModel.page + 1;
  const pageSize = paginationModel.pageSize;

  const { data, isLoading, refetch } = usePaginatedBrandsQuery(
    page,
    pageSize,
    sortModel,
    debouncedKeyword,
  );

  const deleteMutation = useDeleteBrandMutation();
  const rows = data?.data ?? [];
  const rowCount = data?.paginationResult.totalDocs ?? 0;

  const handleDelete = (brand: Brand) => setDeleteTarget(brand);

  const handleRowClick = (params: GridRowParams, event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest('button, svg, path')) return;
    navigate(`/admin/brands/${params.row.id}`);
  };

  const confirmDelete = () => {
    if (!deleteTarget?.id) return;

    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => {
        enqueueSnackbar(`Category deleted`, { variant: 'success' });
      },
      onError: (err) => {
        enqueueSnackbar(err.message || 'Failed to delete category', { variant: 'error' });
      },
      onSettled: () => {
        setDeleteTarget(null);
      },
    });
  };

  const handleEdit = (brand: Brand) => {
    navigate(`/admin/brands/${brand.id}/edit`);
  };

  const columns = getBrandColumns({
    onDelete: handleDelete,
    onEdit: handleEdit,
  });

  const handleFilterModelChange = (m: GridFilterModel) => {
    setFilterModel(m);
    setKeyword(m.quickFilterValues?.[0] ?? '');
  };

  return (
    <>
      <PageContainer
        title="Manage Brands"
        breadcrumbs={[{ title: 'Brands', path: '/admin/brands' }]}
        actions={
          <Stack direction="row" spacing={1}>
            <Tooltip title="Reload data">
              <IconButton onClick={() => refetch()}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              onClick={() => navigate('/admin/brands/new')}
              startIcon={<AddIcon />}
            >
              Create
            </Button>
          </Stack>
        }
      >
        <BrandsGrid
          rows={rows}
          rowCount={rowCount}
          isLoading={isLoading}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          filterModel={filterModel}
          onFilterModelChange={handleFilterModelChange}
          onRowClick={handleRowClick}
        />
      </PageContainer>

      {/* Confirm Delete Dialog */}
      <ConfirmDeleteDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        name={deleteTarget?.name || ''}
        loading={deleteMutation.isPending}
      />
    </>
  );
}
