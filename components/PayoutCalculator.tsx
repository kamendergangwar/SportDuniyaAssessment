'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface NewsItem {
  title: string
  creator: string[] | null
  pubDate: string
  category: string[] | null
}

interface PayoutCalculatorProps {
  data: NewsItem[]
}

export default function PayoutCalculator({ data }: PayoutCalculatorProps) {
  const [payoutRate, setPayoutRate] = useState(() => {
    const storedRate = localStorage.getItem('payoutRate')
    return storedRate ? parseFloat(storedRate) : 10
  })

  useEffect(() => {
    localStorage.setItem('payoutRate', payoutRate.toString())
  }, [payoutRate])

  const authorPayouts = data.reduce((acc: { [key: string]: number }, item) => {
    if (item.creator) {
      item.creator.forEach(author => {
        acc[author] = (acc[author] || 0) + payoutRate
      })
    }
    return acc
  }, {})

  const totalPayout = Object.values(authorPayouts).reduce((sum, payout) => sum + payout, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="payout-rate">Payout Rate per Article ($)</Label>
          <Input
            id="payout-rate"
            type="number"
            value={payoutRate}
            onChange={(e) => setPayoutRate(parseFloat(e.target.value))}
            className="max-w-xs"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Author</TableHead>
              <TableHead>Articles</TableHead>
              <TableHead>Payout</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(authorPayouts).map(([author, payout]) => (
              <TableRow key={author}>
                <TableCell>{author}</TableCell>
                <TableCell>{data.filter(item => item.creator && item.creator.includes(author)).length}</TableCell>
                <TableCell>${payout.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right">
          <strong>Total Payout: ${totalPayout.toFixed(2)}</strong>
        </div>
      </CardContent>
    </Card>
  )
}

