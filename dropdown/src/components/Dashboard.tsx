import { useState, useCallback, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { createGridData, deleteGridData, getGridData } from "../api";
import Serach from "./Serach";

ModuleRegistry.registerModules([AllCommunityModule]);

type Row = {
  id?: number;
  inputValue: string;
  derivedOption: string;
  category: string;
};


const Dashboard = ({isLogin,setIsLogin}:any) => {
  const [rowData, setRowData] = useState<Row[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if(isLogin){
    fetchGrid();
    }
  }, []);

  const fetchGrid = async () => {
    try{
    const res = await getGridData();
    setRowData(res.data);
    setOptions(res.data.map((row: Row) => row.inputValue).filter(Boolean));
    }catch(e){
      setIsLogin(false);
    }
  };

  const addRow = async () => {
    try{
      const newRow: Row = { inputValue: " ", derivedOption: " ", category: " " };
    const res = await createGridData(newRow);
    fetchGrid();
    setRowData((prev) => [...prev,res.data]);
  }catch(error:any){
    console.error(error.res.data);
  }
   
  };

  const onCellValueChanged = useCallback(
    async (params: any) => {
      const updatedRow: Row = params.data;
      await createGridData(updatedRow); 

      if (params.colDef.field === "inputValue") {
        const newValue = params.newValue;
        if (newValue && !options.includes(newValue)) {
          setOptions((prev) => [...prev, newValue]);
        }
      }
    },
    [options]
  );

  const handleDelete = async (id?: number,value?:string) => {
    console.log(id);
    if (!id) return;
    try {
      await deleteGridData(id);
      setRowData((prev) => prev.filter((row) => row.id !== id));
      setOptions((prev)=>prev.filter((opt)=>opt != value));
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  const columnDefs = useMemo(
    (): any => [
      {
        headerName: "Input",
        field: "inputValue",
        editable: true,
        cellEditor: "agTextCellEditor",
      },
      {
        headerName: "Derived Dropdown",
        field: "derivedOption",
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: () => ({
          values: options.length > 0 ? options : ["NoValuesFound"],
        }),
      },
      {
        headerName: "Category",
        field: "category",
        editable: true,
        cellEditor: "agSelectCellEditor",
        filter: "agTextColumnFilter",
        cellEditorParams: {
          values: ["Food", "Clothes", "Electronics"],
        },
      },
      {
        headerName: "Actions",
        field: "actions",
        cellRenderer: (params: any) => (
          <button
            onClick={() => handleDelete(params.data.id,params.data.inputValue)}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        ),
      },
    ],
    [options]
  );

  return (
  <>
      <div style={{ margin: "20px" }}>
        <button onClick={addRow}>Add</button>
        <div className="ag-theme-alpine" style={{ height: 300, width: 800 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            stopEditingWhenCellsLoseFocus={true}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
      <Serach/>   
  </>
);

}

export default Dashboard
