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
import type { Brand } from '../types/brand.type';

type BrandsGridProps = {
  rows: GridRowsProp<Brand>;
  rowCount: number;
  isLoading: boolean;
  paginationModel: GridPaginationModel;
  onPaginationModelChange: (m: GridPaginationModel) => void;
  sortModel: GridSortModel;
  onSortModelChange: (m: GridSortModel) => void;
  onRowClick?: (params: GridRowParams, event: React.MouseEvent) => void;
  filterModel: GridFilterModel;
  onFilterModelChange: (m: GridFilterModel) => void;
  columns: GridColDef<Brand>[];
};

export default function BrandsGrid({
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
}: BrandsGridProps) {
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
