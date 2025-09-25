import { saveAs } from 'file-saver'
import ExcelJS from 'exceljs'
import type { Worksheet } from 'exceljs'
import type { ExcelExportConfig, ExcelTableConfig } from './types'

const addTitle = (ws: Worksheet, title: string): void => {
  ws.addRow([title])
}

const addTable = (ws: Worksheet, { headers, rows }: ExcelTableConfig): void => {
  ws.addRow(headers)
  rows.forEach(row => ws.addRow(row))
}

export const exportFile = async ({ sheets, filename }: ExcelExportConfig): Promise<void> => {
  const wb = new ExcelJS.Workbook()

  sheets.forEach(({ name, title, tables }) => {
    const ws = wb.addWorksheet(name)
    if (title) addTitle(ws, title)
    tables?.forEach(table => addTable(ws, table))
  })

  const buffer = await wb.xlsx.writeBuffer()
  saveAs(new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), filename)
}

export default { exportFile }