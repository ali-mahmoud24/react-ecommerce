import { type GridColDef } from '@mui/x-data-grid';
import { Chip, IconButton, Tooltip } from '@mui/material';
import { CheckCircle, Cancel, AdminPanelSettings, Person } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

import type { User } from '../types/user.type';

export type UserActionsProps = {
  onDelete: (user: User) => void;
};

export const getUserColumns = ({ onDelete }: UserActionsProps): GridColDef[] => [
  { field: 'fullName', headerName: 'Name', flex: 1, minWidth: 150, filterable: false },
  { field: 'email', headerName: 'Email', flex: 1, minWidth: 200, filterable: false },

  {
    field: 'role',
    headerName: 'Role',
    width: 140,
    sortable: false,
    type: 'singleSelect',
    valueOptions: [
      { value: 'admin', label: 'Admin' },
      { value: 'user', label: 'User' },
    ],
    renderCell: (params) =>
      params.value === 'admin' ? (
        <Chip icon={<AdminPanelSettings />} label="Admin" color="primary" size="small" />
      ) : (
        <Chip icon={<Person />} label="User" size="small" />
      ),
  },

  {
    field: 'active',
    headerName: 'Status',
    width: 130,
    sortable: false,
    type: 'singleSelect',
    valueOptions: [
      { value: 'true', label: 'Active' },
      { value: 'false', label: 'Inactive' },
    ],
    valueGetter: ({ value }) => (value ? 'true' : 'false'),
    renderCell: (params) =>
      params.row.active ? (
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
    filterable: false,
    renderCell: (params) => params.value?.split('T')[0] ?? '',
  },

  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    renderCell: (params) => (
      <>
        <Tooltip title="Delete">
          <IconButton onClick={() => onDelete(params.row)} color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </>
    ),
  },
];
