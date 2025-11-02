import { useState } from 'react';
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridSortModel,
  type GridFilterModel,
} from '@mui/x-data-grid';
import {
  Box,
  Stack,
  Typography,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import { CheckCircle, Cancel, AdminPanelSettings, Person, Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

import {
  usePaginatedUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
} from '../hooks/useUsers';

export default function UsersTable() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; userId?: string }>({
    open: false,
  });
  const [createDialog, setCreateDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    profileImageUrl: '',
  });

  const { enqueueSnackbar } = useSnackbar();
  const page = paginationModel.page + 1;
  const pageSize = paginationModel.pageSize;

  const { data, isLoading, refetch } = usePaginatedUsersQuery(
    page,
    pageSize,
    sortModel,
    // filterModel,
  );

  const totalDocs =
    data?.paginationResult.numberOfPages && data?.paginationResult.limit
      ? data.paginationResult.numberOfPages * data.paginationResult.limit
      : 0;

  const rows = data?.data ?? [];
  // const rowCount = data?.paginationResult?.totalDocs ?? rows.length;

  const rowCount = totalDocs;


  const deleteMutation = useDeleteUserMutation();
  const createMutation = useCreateUserMutation();
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Delete handler
  const handleDelete = () => {
    if (!deleteDialog.userId) return;
    deleteMutation.mutate(deleteDialog.userId, {
      onSuccess: () => {
        enqueueSnackbar('User deleted successfully', { variant: 'success' });
        setDeleteDialog({ open: false });
        refetch();
      },
      onError: () => enqueueSnackbar('Failed to delete user', { variant: 'error' }),
    });
  };

  // Create handler
  const handleCreateSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!newUser.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!newUser.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!newUser.email.trim()) newErrors.email = 'Email is required';
    if (!newUser.password) newErrors.password = 'Password is required';
    if (!newUser.confirmPassword) newErrors.confirmPassword = 'Confirm password';
    if (newUser.password !== newUser.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!newUser.role) newErrors.role = 'Role is required';
    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    setErrors({});
    createMutation.mutate(
      { ...newUser, passwordConfirm: newUser.confirmPassword },
      {
        onSuccess: () => {
          enqueueSnackbar('User created successfully', { variant: 'success' });
          setCreateDialog(false);
          setNewUser({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: '',
            profileImageUrl: '',
          });
          refetch();
        },
        onError: () => enqueueSnackbar('Failed to create user', { variant: 'error' }),
      },
    );
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
          <Chip icon={<Person fontSize="small" />} label="User" color="default" size="small" />
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
        <Stack direction="row" spacing={1}>
          <Tooltip title="Delete user">
            <IconButton
              color="error"
              onClick={() => setDeleteDialog({ open: true, userId: params.row.id })}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%', p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Users
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setCreateDialog(true)}>
          + Add User
        </Button>
      </Stack>

      <DataGrid
        sx={{ borderRadius: '6px', border: '1px solid #bebcbcff', boxShadow: 'none' }}
        loading={isLoading}
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        paginationMode="server"
        rowCount={rowCount}
        pageSizeOptions={[5, 10, 25]}
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        filterMode="server"
        filterModel={filterModel}
        onFilterModelChange={setFilterModel}
        disableRowSelectionOnClick
      />

      {/* Delete Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this user?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false })}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={createDialog} onClose={() => setCreateDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="First Name"
            fullWidth
            value={newUser.firstName}
            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            label="Last Name"
            fullWidth
            value={newUser.lastName}
            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            label="Email"
            fullWidth
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            fullWidth
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            label="Confirm Password"
            fullWidth
            type="password"
            value={newUser.confirmPassword}
            onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <TextField
            select
            label="Role"
            fullWidth
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            error={!!errors.role}
            helperText={errors.role}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </TextField>
          <TextField
            label="Profile Image URL (optional)"
            fullWidth
            value={newUser.profileImageUrl}
            onChange={(e) => setNewUser({ ...newUser, profileImageUrl: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateSubmit}
            // disabled={createMutation.isLoading}
          >
            {/* {createMutation.isLoading ? 'Creating...' : 'Create'} */}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
