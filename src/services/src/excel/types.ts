export type ExcelCell = string | number | boolean | Date | null

export type ExcelTableConfig = {
  headers: string[]
  rows: ExcelCell[][]
}

export type ExcelSheetConfig = {
  name: string
  title: string
  tables: ExcelTableConfig[]
}

export type ExcelExportConfig = {
  filename: string
  sheets: ExcelSheetConfig[]
}