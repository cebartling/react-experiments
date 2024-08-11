import { useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridSlots,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { createGridColDefArray } from './createGridColDefArray.tsx';
import { DemographicsFormData } from '../types';
import AddIcon from '@mui/icons-material/Add';

const initialRows: DemographicsFormData[] = [
  {
    id: 1,
    firstName: 'Kristoffer',
    lastName: 'Klaus',
    email: 'kris.klaus112@any-domain.com',
  } as DemographicsFormData,
  {
    id: 2,
    firstName: 'Connie',
    lastName: 'Clausen',
    email: 'connie.clausen@any-domain.com',
  } as DemographicsFormData,
  {
    id: 3,
    firstName: 'Catrina',
    lastName: 'Klasson',
    email: 'catrina.klasson@any-domain.com',
  } as DemographicsFormData,
];

interface EditToolbarProps {
  oldRows: GridRowsProp;
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar({ oldRows, setRows, setRowModesModel }: EditToolbarProps) {

  const handleClick = () => {
    const id = oldRows.length + 1;
    setRows((oldRows) => [...oldRows, { id, firstName: '', lastName: '', email: '' }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'firstName' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary"
              startIcon={<AddIcon />}
              onClick={handleClick}>
        Add
      </Button>
    </GridToolbarContainer>
  );
}


export function DemographicsCard() {
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { handleSubmit, control, register } = useForm();
  useFieldArray({
    control,
    name: 'form',
  });
  const columns: GridColDef[] = useMemo(() => createGridColDefArray(control, register), [control, register]);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow: GridRowModel<DemographicsFormData>) => {
    const updatedRow = { ...newRow };
    const newRows = rows.map((row) => (row.id === newRow.id ? updatedRow : row));
    setRows(newRows);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // const handleEditClick = (id: GridRowId) => () => {
  //   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  // };

  // const handleSaveClick = (id: GridRowId) => () => {
  //   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  // };
  //
  // const handleDeleteClick = (id: GridRowId) => () => {
  //   setRows(rows.filter((row) => row.id !== id));
  // };
  //
  // const handleCancelClick = (id: GridRowId) => () => {
  //   setRowModesModel({
  //     ...rowModesModel,
  //     [id]: { mode: GridRowModes.View, ignoreModifications: true },
  //   });

  //   const editedRow = rows.find((row) => row.id === id);
  //   if (editedRow!.isNew) {
  //     setRows(rows.filter((row) => row.id !== id));
  //   }
  // };


  return (
    <div className="p-5">
      <h2>Demographics</h2>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="w-full h-[500px]">
          <DataGrid rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{
                      toolbar: EditToolbar as GridSlots['toolbar'],
                    }}
                    slotProps={{
                      toolbar: { oldRows: rows, setRows, setRowModesModel },
                    }}
          />
        </div>
        <div className="mt-4">
          <Button type="submit" variant="contained">
            Save
          </Button>
        </div>
      </form>
      <DevTool control={control} placement="top-right" />
    </div>
  );
}
