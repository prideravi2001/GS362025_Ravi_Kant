import * as XLSX from 'xlsx';

// Function to load chart data from Excel file
export const loadChartData = async () => {
  const response = await fetch("GS362025_Ravi_Kant/src/assets/GSIV25 - Sample Data.xlsx"); // Adjust path if necessary
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  console.log(workbook)

  const sheet = workbook.Sheets["Chart"];
  console.log(sheet);
  return XLSX.utils.sheet_to_json(sheet);
};
