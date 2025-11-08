import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Stack, Button, IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';
import useDebounce from '@/hooks/useDebounce';
import PageContainer from './PageContainer';
import ProductsGrid from './ProductsGrid';
import { getProductColumns } from './ProductColumns';
import { usePaginatedProductsQuery, useDeleteProductMutation } from '../hooks/useProducts';
import type { Product } from '../types/product.type';
import type { GridFilterModel, GridRowParams, GridSortModel } from '@mui/x-data-grid';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

export default function ProductTable() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });

  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 300);

  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const page = paginationModel.page + 1;
  const pageSize = paginationModel.pageSize;

  const { data, isLoading, refetch } = usePaginatedProductsQuery(
    page,
    pageSize,
    sortModel,
    filterModel,
    debouncedKeyword,
  );

  const deleteMutation = useDeleteProductMutation();
  const rows = data?.data ?? [];
  const rowCount = data?.paginationResult.totalDocs ?? 0;

  const handleDelete = (p: Product) => setDeleteTarget(p);

  const handleRowClick = (params: GridRowParams, event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest('button, svg, path')) return;
    navigate(`/admin/products/${params.row.id}`);
  };

  const confirmDelete = () => {
    if (!deleteTarget?.id) return;
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => enqueueSnackbar(`Product deleted`, { variant: 'success' }),
      onSettled: () => setDeleteTarget(null),
    });
  };

  const handleEdit = (product: Product) => {
    navigate(`/admin/products/${product.id}/edit`);
  };

  const columns = getProductColumns({
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
        title="Manage Products"
        breadcrumbs={[{ title: 'Products', path: '/admin/products' }]}
        actions={
          <Stack direction="row" spacing={1}>
            <Tooltip title="Reload data">
              <IconButton onClick={() => refetch()}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              onClick={() => navigate('/admin/products/new')}
              startIcon={<AddIcon />}
            >
              Create
            </Button>
          </Stack>
        }
      >
        <ProductsGrid
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

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        name={deleteTarget?.title ?? ''}
        loading={deleteMutation.isPending}
      />
    </>
  );
}
