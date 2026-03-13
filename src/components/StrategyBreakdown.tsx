import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Divider,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { ColDef, GetContextMenuItemsParams, MenuItemDef, ModuleRegistry, ValueFormatterParams } from 'ag-grid-community';
import { SetFilterModule } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState, MouseEvent } from 'react';
import { useMultiselect } from '../hooks/useMultiselect';
import { Strategy, useStrategies } from '../hooks/useStrategies';
import { useTheme } from '../hooks/useTheme';
import { CompareStrategies } from './CompareStrategies';
import './StrategyBreakdown.css';

ModuleRegistry.registerModules([
  SetFilterModule,
]);

export const defaultColDef: ColDef = {
  sortable: true,
  flex: 1,
  floatingFilter: true,
};

function decimalFormatter(params: ValueFormatterParams) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(params.value);
}

function currencyFormatter(params: ValueFormatterParams) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(params.value);
}

function currencyThousandsFormatter(params: ValueFormatterParams) {
  return `${currencyFormatter(params)}k`;
}

export const columnDefs: ColDef[] = [
  { field: 'name', headerName: 'Name', filter: 'agMultiColumnFilter' },
  { field: 'desk_name', headerName: 'Desk Name', filter: 'agMultiColumnFilter' },
  {
    field: '1y_sharpe', headerName: '1Y Sharpe', valueFormatter: decimalFormatter, sort: 'desc',
    cellClassRules: {
      'rag-darkgreen': params => params.value >= 3,
      'rag-green': params => params.value >= 2 && params.value < 3,
      'rag-red': params => params.value < 1,
    },
    filter: 'agNumberColumnFilter',
    type: 'rightAligned',
  },
  {
    field: '1y_pnl', headerName: '1Y Pnl (k$)', valueFormatter: currencyThousandsFormatter,
    cellClassRules: {
      'rag-green': params => params.value > 0,
      'rag-red': params => params.value < 0,
    },
    filter: 'agNumberColumnFilter',
    type: 'rightAligned',
  },
  {
    field: '1y_stddev_pnl', headerName: '1Y StdDev Pnl (k$)', valueFormatter: currencyThousandsFormatter,
    filter: 'agNumberColumnFilter',
    type: 'rightAligned',
  },
  {
    field: '1y_net_pnl', headerName: '1Y Net Pnl (k$)', valueFormatter: currencyThousandsFormatter,
    cellClassRules: {
      'rag-green': params => params.value > 0,
      'rag-red': params => params.value < 0,
    },
    filter: 'agNumberColumnFilter',
    type: 'rightAligned',
  },
];

export interface StrategyBreakdownProps {
  onRowSelectionChanged: (selectedRows: Strategy[]) => void;
}

export const StrategyBreakdown = ({ onRowSelectionChanged }: StrategyBreakdownProps) => {
  const gridRef = useRef<AgGridReact>(null);
  const [selectedRows, setSelectedRows] = useState<Strategy[]>([]);
  const [multiselect, setMultiselect] = useMultiselect();
  const rowData = useStrategies();
  const [theme, setTheme] = useTheme();
  const [comparisonDialogIsOpen, setComparisonDialogOpen] = useState(false);
  const [quickFilter, setQuickFilter] = useState('');
  const [dateMenuAnchorEl, setDateMenuAnchorEl] = useState<null | HTMLElement>(null);

  const onSelectionChanged = useCallback(() => {
    const rows = gridRef.current!.api.getSelectedRows();
    setSelectedRows(rows);
    onRowSelectionChanged(rows);
  }, [onRowSelectionChanged]);

  const gridClassName = useMemo(() => `ag-theme-balham${theme === 'dark' ? '-dark' : ''}`, [theme]);

  const handleDateMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setDateMenuAnchorEl(event.currentTarget);
  };

  const handleDateMenuClose = () => {
    setDateMenuAnchorEl(null);
  };

  const getContextMenuItems = useCallback((params: GetContextMenuItemsParams): (string | MenuItemDef)[] => {
    return [
      {
        name: 'Compare Strategies',
        disabled: selectedRows.length !== 2,
        tooltip: 'Compare selected strategies. Exactly two strategies need to be selected.',
        action: () => setComparisonDialogOpen(true),
      },
      'separator',
      'copy',
      'copyWithHeaders',
      'copyWithGroupHeaders',
      'paste',
      'separator',
      {
        name: 'Export',
        subMenu: [
          'csvExport',
          'excelExport',
        ],
      },
    ];
  }, [selectedRows.length]);

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Dialog
        open={comparisonDialogIsOpen}
        onClose={() => setComparisonDialogOpen(false)}
        maxWidth={false}
        PaperProps={{ sx: { width: '80%', height: '80%' } }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Compare Strategies
          <IconButton onClick={() => setComparisonDialogOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <CompareStrategies strategies={selectedRows} />
        </DialogContent>
      </Dialog>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ m: 1 }}>Strategy Perf Summaries</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={theme === 'dark'}
              onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />
          }
          label="Dark Mode"
          sx={{ mr: 1 }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', gap: 8, margin: 8, width: '100%' }}>
        <TextField
          placeholder="Search strategy..."
          size="small"
          variant="outlined"
          value={quickFilter}
          onChange={(event) => setQuickFilter(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          placeholder="Search by author..."
          size="small"
          variant="outlined"
          disabled
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <div style={{ marginLeft: 'auto', marginRight: 15, display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={multiselect}
                onChange={() => setMultiselect(!multiselect)}
                size="small"
              />
            }
            label="Multiselect"
          />
          <Button
            variant="outlined"
            size="small"
            startIcon={<CalendarMonthIcon />}
            endIcon={<ArrowDropDownIcon />}
            onClick={handleDateMenuOpen}
          >
            One year
          </Button>
          <Menu
            anchorEl={dateMenuAnchorEl}
            open={Boolean(dateMenuAnchorEl)}
            onClose={handleDateMenuClose}
          >
            <MenuItem onClick={handleDateMenuClose}>
              <CheckIcon fontSize="small" sx={{ mr: 1 }} />
              One Year
            </MenuItem>
            <MenuItem disabled>Two Years</MenuItem>
            <MenuItem disabled>Five Years</MenuItem>
            <Divider />
            <MenuItem disabled>Custom date range…</MenuItem>
          </Menu>
        </div>
      </div>

      <div className={gridClassName} style={{ flex: 1 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          rowSelection={multiselect ? 'multiple' : 'single'}
          onGridReady={(event) => event.api.sizeColumnsToFit()}
          quickFilterText={quickFilter}
          onSelectionChanged={onSelectionChanged}
          getContextMenuItems={getContextMenuItems}
        />
      </div>
    </div>
  );
};