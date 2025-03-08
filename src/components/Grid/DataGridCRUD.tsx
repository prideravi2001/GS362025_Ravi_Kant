import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
    GridSlotProps,
} from '@mui/x-data-grid';
import { randomId, } from '@mui/x-data-grid-generator';
import { Skus } from '../../redux/slices/skuSlice';
import { Store } from '../../redux/slices/storeSlice';


declare module '@mui/x-data-grid' {
    interface ToolbarPropsOverrides {
        setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
        setRowModesModel: (
            newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
        ) => void;
    }
}


export default function FullFeaturedCrudGrid({ data, type = "skus" }: { data: Skus[] | Store[] | any[], type: string }) {
    // const [title, setTitle] = useState<string[]>([]);
    const [rows, setRows] = useState<any[] | any>([]);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    useEffect(() => {

    }, [rows]);
    useEffect(() => {
        // if (data.length > 0) {
        //     let titleArr = Object.keys(data[0]);
        //     setTitle(titleArr.filter(a => a != "ID"));
        // }
        setRows(data);

    }, [data]);


    function EditToolbar(props: GridSlotProps['toolbar']) {
        const { setRows, setRowModesModel } = props;

        const handleClick = () => {
            const ID = randomId();
            setRows((oldRows) => {
                const newRows = [{ ID, Label: '', Price: 0, Cost: 0, isNew: true }, ...oldRows];
                console.log("Updated Rows:", newRows);
                return newRows;
            });

            setRowModesModel((oldModel) => ({
                ...oldModel,
                [ID]: { mode: GridRowModes.Edit, fieldToFocus: 'Label' },
            }));
        };

        return (
            <GridToolbarContainer>
                <Button color="primary" variant='outlined' startIcon={<AddIcon />} onClick={handleClick}>
                    {`Add ${type.toUpperCase()}`}
                </Button>
            </GridToolbarContainer>
        );
    }

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId | any) => () => {
        setRowModesModel({ ...rowModesModel, [id.id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId | any) => () => {
        setRowModesModel({ ...rowModesModel, [id.id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId | any) => () => {
        setRows(rows.filter((row: any) => `${row.ID}` !== id.id));
    };

    const handleCancelClick = (id: GridRowId | any) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id.id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row: any) => `${row.ID}` === id.id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row: any) => `${row.ID}` !== id.id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel | any) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row: any) => (`${row.ID}` == `${newRow.ID}` ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = (type.toLowerCase() == "skus") ? [

        {
            field: 'actions',
            type: 'actions',
            headerName: '',
            width: 100,
            cellClassName: 'actions',
            getActions: (id) => {
                const isInEditMode = rowModesModel[id.id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
        { field: 'Label', headerName: 'Label', width: 180, editable: true },
        {
            field: 'Price',
            headerName: 'Price',
            type: 'number',
            width: 80,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'Cost',
            headerName: 'Cost',
            // type: 'date',
            type: 'number',
            width: 80,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },

    ] : [
        {
            field: 'actions',
            type: 'actions',
            headerName: '',
            width: 100,
            cellClassName: 'actions',
            getActions: (id) => {
                // const {__rowNum__} = id;
                const isInEditMode = rowModesModel[id.id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
        {
            field: 'Seq No.', headerName: 'Seq No.', width: 80, editable: false, align: 'center',
        },
        { field: 'Label', headerName: 'Label', width: 180, editable: true },
        {
            field: 'City',
            headerName: 'City',
            type: 'string',
            width: 140,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'State',
            headerName: 'State',
            type: 'string',
            width: 80,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
    ];


    function getRowId(row: { ID: string; Label: string; } | any) {
        return `${row.ID}`;
        // return randomId();
    }

    return (
        <Box
            sx={{
                height: 500,
                width: '88vw',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >

            <DataGrid
                rows={rows}
                getRowId={getRowId}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{ toolbar: EditToolbar }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
        </Box>
    );
}
