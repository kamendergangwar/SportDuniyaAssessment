import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

interface NewsItem {
  id: string
  title: string
  author: string
  date: string
  type: string
}

interface ExportOptionsProps {
  data: NewsItem[]
}

export default function ExportOptions({ data }: ExportOptionsProps) {
  const exportToCSV = () => {
    const csvContent = data.map(item => Object.values(item).join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    FileSaver.saveAs(blob, 'news_data.csv')
  }

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'News Data')
    XLSX.writeFile(wb, 'news_data.xlsx')
  }

  const exportToPDF = () => {
    const doc = new jsPDF() as any
    doc.autoTable({
      head: [['Title', 'Author', 'Date', 'Type']],
      body: data.map(item => [item.title, item.author, item.date, item.type]),
    })
    doc.save('news_data.pdf')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Options</CardTitle>
        <CardDescription>Choose a format to export your data</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <Button onClick={exportToCSV} className="w-full">Export to CSV</Button>
        <Button onClick={exportToExcel} className="w-full">Export to Excel</Button>
        <Button onClick={exportToPDF} className="w-full">Export to PDF</Button>
      </CardContent>
    </Card>
  )
}

