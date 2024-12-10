'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

interface NewsItem {
  title: string
  creator: string[] | null
  pubDate: string
  category: string[] | null
}

interface NewsChartProps {
  data: NewsItem[]
}

export default function NewsChart({ data }: NewsChartProps) {
  const chartData = data.reduce((acc: { [key: string]: number }, item) => {
    if (item.creator) {
      item.creator.forEach(author => {
        acc[author] = (acc[author] || 0) + 1
      })
    }
    return acc
  }, {})

  const formattedData = Object.entries(chartData).map(([author, count]) => ({
    author,
    count,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Articles by Author</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={formattedData}>
            <XAxis dataKey="author" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

