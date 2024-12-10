import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
  
  interface NewsItem {
    title: string
    creator: string[] | null
    pubDate: string
    category: string[] | null
  }
  
  interface NewsTableProps {
    data: NewsItem[]
  }
  
  export default function NewsTable({ data }: NewsTableProps) {
    return (
      <Table>
        <TableCaption>A list of recent news articles and blog posts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.creator ? item.creator.join(', ') : 'Unknown'}</TableCell>
              <TableCell>{new Date(item.pubDate).toLocaleDateString()}</TableCell>
              <TableCell>{item.category ? item.category.join(', ') : 'Uncategorized'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  
  