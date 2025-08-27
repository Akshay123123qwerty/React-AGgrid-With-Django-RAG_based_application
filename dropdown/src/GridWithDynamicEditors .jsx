import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";



const GridWithDynamicEditors = () => {
  const [rowData, setRowData] = useState([]);

  const addRow = () => {
    setRowData([
      ...rowData,
      { inputValue: "", derivedOption: "", category: "" },
    ]);
  };

  const [columnDefs] = useState([
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
      cellEditorParams: (params ) => {
        // dropdown options depend on first column
        const val = params.data.inputValue;
        if (!val) return { values: [] };
        return { values: [`${val}-A`, `${val}-B`, `${val}-C`] };
      },
    },
    {
      headerName: "Category",
      field: "category",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Food", "Clothes", "Electronics"],
      },
    },
  ]);

  return (
    <div style={{ margin: "20px" }}>
      <button
        onClick={addRow}
        style={{
          marginBottom: "10px",
          padding: "6px 12px",
          borderRadius: "6px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
        }}
      >
        +
      </button>
      <div className="ag-theme-alpine" style={{ height: 300, width: 600 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          stopEditingWhenCellsLoseFocus={true}
        />
      </div>
    </div>
  );
};

export default GridWithDynamicEditors;
