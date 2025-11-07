import { type GridColDef } from '@mui/x-data-grid';
import { Chip, IconButton, Tooltip } from '@mui/material';
import {
  CheckCircle,
  Cancel,
  AdminPanelSettings,
  Person,
  Delete,
} from '@mui/icons-material';
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
        <Chip
          icon={<Cancel />}
          label="Inactive"
          color="error"
          size="small"
          variant="outlined"
        />
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
    width: 120,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Tooltip title="Delete user">
        <IconButton color="error" onClick={() => onDelete(params.row)}>
          <Delete fontSize="small" />
        </IconButton>
      </Tooltip>
    ),
  },
];
