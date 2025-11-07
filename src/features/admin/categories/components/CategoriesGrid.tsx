import {
  DataGrid,
  gridClasses,
  type GridColDef,
  type GridPaginationModel,
  type GridSortModel,
  type GridFilterModel,
  type GridRowsProp,
  type GridRowParams,
} from '@mui/x-data-grid';
import CustomToolbar from './CustomToolbar';
import type { Category } from '../types/category.type';

type CategoriesGridProps = {
  rows: GridRowsProp<Category>;
  rowCount: number;
  isLoading: boolean;
  paginationModel: GridPaginationModel;
  onPaginationModelChange: (m: GridPaginationModel) => void;
  sortModel: GridSortModel;
  onSortModelChange: (m: GridSortModel) => void;
  onRowClick?: (params: GridRowParams, event: React.MouseEvent) => void;
  filterModel: GridFilterModel;
  onFilterModelChange: (m: GridFilterModel) => void;
  columns: GridColDef<Category>[];
};

export default function CategoriesGrid({
  rows,
  rowCount,
  isLoading,
  paginationModel,
  onPaginationModelChange,
  sortModel,
  onSortModelChange,
  filterModel,
  onFilterModelChange,
  columns,
  onRowClick,
}: CategoriesGridProps) {
  return (
    <DataGrid
      rows={rows}
      rowCount={rowCount}
      columns={columns}
      loading={isLoading}
      pagination
      paginationMode="server"
      sortingMode="server"
      filterMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      sortModel={sortModel}
      onSortModelChange={onSortModelChange}
      filterModel={filterModel}
      onFilterModelChange={onFilterModelChange}
      getRowId={(row) => row.id}
      disableRowSelectionOnClick
      pageSizeOptions={[5, 10, 25]}
      showToolbar
      slots={{ toolbar: CustomToolbar }}
      onRowClick={onRowClick}
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
    />
  );
}
