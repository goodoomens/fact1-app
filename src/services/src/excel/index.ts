import ExcelJS from 'exceljs'
import type { Worksheet } from 'exceljs'
import type { ExcelExportConfig, ExcelTableConfig } from './types'

function addTitle(ws: Worksheet, title: string) {
  ws.getCell('A1').value = title
}

function addTable(ws: Worksheet, table: ExcelTableConfig) {
  ws.addRow(table.headers)
  table.rows.forEach((r) => ws.addRow(r))
}

export const exportFile = async (config: ExcelExportConfig): Promise<void> => {
  const wb = new ExcelJS.Workbook()
  const now = new Date()
  wb.created = now
  wb.modified = now
  wb.calcProperties.fullCalcOnLoad = true

  config.sheets.forEach((sheet) => {
    const ws = wb.addWorksheet(sheet.name)
    if (sheet.title) addTitle(ws, sheet.title)
    sheet.tables.forEach((t) => addTable(ws, t))
  })

  const buffer = await wb.xlsx.writeBuffer()
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = config.filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default { exportFile }