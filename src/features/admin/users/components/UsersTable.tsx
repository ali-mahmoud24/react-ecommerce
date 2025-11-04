import { useCallback, useState } from 'react';
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridSortModel,
  type GridFilterModel,
  gridClasses,
} from '@mui/x-data-grid';
import {
  Stack,
  Button,
  Chip,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { CheckCircle, Cancel, AdminPanelSettings, Person, Delete } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSnackbar } from 'notistack';
import { usePaginatedUsersQuery, useDeleteUserMutation } from '../hooks/useUsers';
import PageContainer from './PageContainer';
import { useNavigate } from 'react-router';

export default function UsersTable() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name?: string } | null>(null);

  const page = paginationModel.page + 1;
  const pageSize = paginationModel.pageSize;

  const { data, isLoading, refetch } = usePaginatedUsersQuery(page, pageSize, sortModel);
  const deleteMutation = useDeleteUserMutation();

  const rows = data?.data ?? [];
  const rowCount = data?.paginationResult.totalDocs;

  const handleCreateClick = useCallback(() => {
    navigate('/admin/users/new');
  }, [navigate]);

  // ✅ Confirmation-based delete handler
  const handleRowDelete = useCallback(
    (user: any) => async () => {
      setDeleteTarget({ id: user.id, name: user.fullName });
    },
    [],
  );

  const confirmDelete = () => {
    if (!deleteTarget?.id) return;

    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => {
        enqueueSnackbar(`User "${deleteTarget.name}" deleted successfully.`, {
          variant: 'success',
        });
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to delete user. ${(err as Error).message}`, { variant: 'error' });
      },
      onSettled: () => {
        setDeleteTarget(null);
      },
    });
  };

  const columns: GridColDef[] = [
    { field: 'fullName', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    {
      field: 'role',
      headerName: 'Role',
      width: 140,
      renderCell: (params) =>
        params.value === 'admin' ? (
          <Chip
            icon={<AdminPanelSettings fontSize="small" />}
            label="Admin"
            color="primary"
            size="small"
          />
        ) : (
          <Chip icon={<Person fontSize="small" />} label="User" size="small" />
        ),
    },
    {
      field: 'active',
      headerName: 'Status',
      width: 130,
      renderCell: (params) =>
        params.value ? (
          <Chip
            icon={<CheckCircle />}
            label="Active"
            color="success"
            size="small"
            variant="outlined"
          />
        ) : (
          <Chip icon={<Cancel />} label="Inactive" color="error" size="small" variant="outlined" />
        ),
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 150,
      renderCell: (params) => params.value?.split('T')[0] ?? '',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="Delete user">
          <IconButton color="error" onClick={handleRowDelete(params.row)}>
            <Delete fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <PageContainer
        title="Manage Users"
        breadcrumbs={[{ title: 'Users', path: '/admin/users' }]}
        actions={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title="Reload data" placement="right" enterDelay={1000}>
              <div>
                <IconButton size="small" aria-label="refresh" onClick={() => refetch()}>
                  <RefreshIcon />
                </IconButton>
              </div>
            </Tooltip>
            <Button variant="contained" onClick={handleCreateClick} startIcon={<AddIcon />}>
              Create
            </Button>
          </Stack>
        }
      >
        <DataGrid
          rows={rows}
          rowCount={rowCount}
          columns={columns}
          pagination
          sortingMode="server"
          filterMode="server"
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          filterModel={filterModel}
          onFilterModelChange={setFilterModel}
          disableRowSelectionOnClick
          loading={isLoading}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 25]}
          showToolbar
          onRowClick={(params, event) => {
            // ✅ Prevent clicks on buttons (like delete)
            const target = event.target as HTMLElement;
            if (target.closest('button, svg, path')) return;

            // ✅ Navigate to details page
            navigate(`/admin/users/${params.row.id}`);
          }}
          sx={{
            borderRadius: '6px',
            border: '1px solid #bebcbcff',
            boxShadow: 'none',
            [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
              outline: 'transparent',
            },
            [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]: {
              outline: 'none',
            },
            [`& .${gridClasses.row}:hover`]: {
              cursor: 'pointer',
            },
          }}
          slotProps={{
            baseIconButton: { size: 'small' },
          }}
        />
      </PageContainer>

      {/* ✅ Delete confirmation dialog */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete User?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <b>{deleteTarget?.name}</b>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
