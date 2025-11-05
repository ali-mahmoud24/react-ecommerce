import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Stack, Button, IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';
import useDebounce from '@/hooks/useDebounce';
import PageContainer from './PageContainer';
import UsersGrid from './UsersGrid';
import { getUserColumns } from './UserColumns';
import { usePaginatedUsersQuery, useDeleteUserMutation } from '../hooks/useUsers';
import type { User } from '../types/user.type';
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

  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const page = paginationModel.page + 1;
  const pageSize = paginationModel.pageSize;

  const { data, isLoading, refetch } = usePaginatedUsersQuery(
    page,
    pageSize,
    sortModel,
    filterModel,
    debouncedKeyword,
  );

  const deleteMutation = useDeleteUserMutation();
  const rows = data?.data ?? [];
  const rowCount = data?.paginationResult.totalDocs ?? 0;

  const handleDelete = (user: User) => setDeleteTarget(user);

    const handleRowClick = (params: GridRowParams, event: React.MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('button, svg, path')) return;
      navigate(`/admin/users/${params.row.id}`);
    };

  const confirmDelete = () => {
    if (!deleteTarget?.id) return;
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => enqueueSnackbar(`User deleted`, { variant: 'success' }),
      onSettled: () => setDeleteTarget(null),
    });
  };

  const columns = getUserColumns({ onDelete: handleDelete });

  const handleFilterModelChange = (m: GridFilterModel) => {
    setFilterModel(m);
    setKeyword(m.quickFilterValues?.[0] ?? '');
  };

  return (
    <>
      <PageContainer
        title="Manage Users"
        breadcrumbs={[{ title: 'Users', path: '/admin/users' }]}
        actions={
          <Stack direction="row" spacing={1}>
            <Tooltip title="Reload data">
              <IconButton onClick={() => refetch()}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              onClick={() => navigate('/admin/users/new')}
              startIcon={<AddIcon />}
            >
              Create
            </Button>
          </Stack>
        }
      >
        <UsersGrid
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
        name={deleteTarget?.fullName || ''}
        loading={deleteMutation.isPending}
      />
    </>
  );
}
