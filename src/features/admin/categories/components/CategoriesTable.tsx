import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Stack, Button, IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';
import useDebounce from '@/hooks/useDebounce';
import PageContainer from './PageContainer';
import CategoriesGrid from './CategoriesGrid';
import { getCategoryColumns } from './CategoryColumns';
import { usePaginatedCategoriesQuery, useDeleteCategoryMutation } from '../hooks/useCategories';
import type { Category } from '../types/category.type';
import type { GridFilterModel, GridRowParams, GridSortModel } from '@mui/x-data-grid';

import ConfirmDeleteDialog from './ConfirmDeleteDialog';

export default function UsersTable() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });

  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 300);

  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const page = paginationModel.page + 1;
  const pageSize = paginationModel.pageSize;

  const { data, isLoading, refetch } = usePaginatedCategoriesQuery(
    page,
    pageSize,
    sortModel,
    debouncedKeyword,
  );

  const deleteMutation = useDeleteCategoryMutation();
  const rows = data?.data ?? [];
  const rowCount = data?.paginationResult.totalDocs ?? 0;

  const handleDelete = (user: Category) => setDeleteTarget(user);

  const handleRowClick = (params: GridRowParams, event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest('button, svg, path')) return;
    navigate(`/admin/categories/${params.row.id}`);
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

  const handleEdit = (category: Category) => {
    navigate(`/admin/categories/${category.id}/edit`);
  };

  const columns = getCategoryColumns({
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
        title="Manage Categories"
        breadcrumbs={[{ title: 'Categories', path: '/admin/categories' }]}
        actions={
          <Stack direction="row" spacing={1}>
            <Tooltip title="Reload data">
              <IconButton onClick={() => refetch()}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              onClick={() => navigate('/admin/categories/new')}
              startIcon={<AddIcon />}
            >
              Create
            </Button>
          </Stack>
        }
      >
        <CategoriesGrid
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
