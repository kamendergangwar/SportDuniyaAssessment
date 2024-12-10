// 'use client'

// import { useEffect, useState, useCallback, useMemo } from 'react'
// import { useAuth } from '../context/AuthContext'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { DateRangePicker } from '@/components/ui/date-range-picker'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import NewsTable from '@/components/NewsTable'
// import NewsChart from '@/components/NewsChart'
// import PayoutCalculator from '@/components/PayoutCalculator'
// import ExportOptions from '@/components/ExportOptions'
// import { MoonIcon, SunIcon } from 'lucide-react'

// // Define the structure of a news item
// interface NewsItem {
//   id: string;
//   title: string;
//   author: string;
//   date: string;
//   type: string;
// }

// export default function Dashboard() {
//   const { user, logout } = useAuth()
//   const [newsData, setNewsData] = useState<NewsItem[]>([])
//   const [loading, setLoading] = useState(true)
//   const [filters, setFilters] = useState({
//     author: '',
//     dateRange: { from: null, to: null },
//     type: '',
//     keyword: '',
//   })
//   const [isDarkMode, setIsDarkMode] = useState(false)

//   const fetchNewsData = useCallback(async () => {
//     setLoading(true);
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       const mockData: NewsItem[] = [
//         { id: '1', title: 'First Article', author: 'John Doe', date: '2023-05-01', type: 'news' },
//         { id: '2', title: 'Second Article', author: 'Jane Smith', date: '2023-05-02', type: 'blog' },
//         { id: '3', title: 'Third Article', author: 'John Doe', date: '2023-05-03', type: 'news' },
//         { id: '4', title: 'Fourth Article', author: 'Alice Johnson', date: '2023-05-04', type: 'blog' },
//         { id: '5', title: 'Fifth Article', author: 'Bob Brown', date: '2023-05-05', type: 'news' },
//       ];
//       setNewsData(mockData);
//     } catch (err) {
//       console.error('Error fetching news data:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchNewsData()
//   }, [fetchNewsData])

//   const handleFilterChange = useCallback((key: string, value: any) => {
//     setFilters((prev) => ({ ...prev, [key]: value }))
//   }, [])

//   const handleDateRangeChange = useCallback((range: any) => {
//     handleFilterChange('dateRange', range)
//   }, [handleFilterChange])

//   const handleTypeChange = useCallback((value: string) => {
//     handleFilterChange('type', value)
//   }, [handleFilterChange])

//   const filteredNews = useMemo(() => {
//     return newsData.filter((item) => {
//       return (
//         (filters.author ? item.author.toLowerCase().includes(filters.author.toLowerCase()) : true) &&
//         (filters.type ? item.type === filters.type : true) &&
//         (filters.keyword ? item.title.toLowerCase().includes(filters.keyword.toLowerCase()) : true)
//       )
//     })
//   }, [newsData, filters])

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode)
//     document.documentElement.classList.toggle('dark')
//   }

//   if (!user) {
//     return <div>Please log in to access the dashboard.</div>
//   }

//   return (
//     <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
//       <div className="container mx-auto p-4">
//         <header className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-indigo-800 dark:text-indigo-200">News Dashboard</h1>
//           <div className="flex items-center space-x-4">
//             <Button onClick={toggleDarkMode} variant="outline" size="icon">
//               {isDarkMode ? <SunIcon className="h-[1.2rem] w-[1.2rem]" /> : <MoonIcon className="h-[1.2rem] w-[1.2rem]" />}
//             </Button>
//             <Button onClick={logout}>Logout</Button>
//           </div>
//         </header>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
//             <CardHeader>
//               <CardTitle>Total Articles</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{newsData.length}</p>
//             </CardContent>
//           </Card>
//           <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
//             <CardHeader>
//               <CardTitle>Unique Authors</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">{new Set(newsData.map((item) => item.author)).size}</p>
//             </CardContent>
//           </Card>
//           <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
//             <CardHeader>
//               <CardTitle>Article Types</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-4xl font-bold text-pink-600 dark:text-pink-400">{new Set(newsData.map((item) => item.type)).size}</p>
//             </CardContent>
//           </Card>
//         </div>

//         <Card className="mb-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
//           <CardHeader>
//             <CardTitle>Filters</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div>
//                 <Label htmlFor="author">Author</Label>
//                 <Input
//                   id="author"
//                   placeholder="Filter by author"
//                   value={filters.author}
//                   onChange={(e) => handleFilterChange('author', e.target.value)}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="date-range">Date Range</Label>
//                 <DateRangePicker onSelect={handleDateRangeChange} />
//               </div>
//               <div>
//                 <Label htmlFor="type">Type</Label>
//                 <Select onValueChange={handleTypeChange}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="news">News</SelectItem>
//                     <SelectItem value="blog">Blog</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div>
//                 <Label htmlFor="keyword">Keyword Search</Label>
//                 <Input
//                   id="keyword"
//                   placeholder="Search by keyword"
//                   value={filters.keyword}
//                   onChange={(e) => handleFilterChange('keyword', e.target.value)}
//                 />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {loading && <p className="text-center text-lg">Loading news data...</p>}

//         {!loading && (
//           <Tabs defaultValue="table" className="w-full">
//             <TabsList className="grid w-full grid-cols-4">
//               <TabsTrigger value="table">Table View</TabsTrigger>
//               <TabsTrigger value="chart">Chart View</TabsTrigger>
//               <TabsTrigger value="payout">Payout Calculator</TabsTrigger>
//               <TabsTrigger value="export">Export Options</TabsTrigger>
//             </TabsList>
//             <TabsContent value="table">
//               <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
//                 <CardContent className="pt-6">
//                   <NewsTable data={filteredNews} />
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             <TabsContent value="chart">
//               <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
//                 <CardContent className="pt-6">
//                   <NewsChart data={filteredNews} />
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             <TabsContent value="payout">
//               <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
//                 <CardContent className="pt-6">
//                   <PayoutCalculator data={filteredNews} />
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             <TabsContent value="export">
//               <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
//                 <CardContent className="pt-6">
//                   <ExportOptions data={filteredNews} />
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         )}
//       </div>
//     </div>
//   )
// }

'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { useAuth } from '../context/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NewsTable from '@/components/NewsTable'
import NewsChart from '@/components/NewsChart'
import PayoutCalculator from '@/components/PayoutCalculator'
import ExportOptions from '@/components/ExportOptions'
import { MoonIcon, SunIcon } from 'lucide-react'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [newsData, setNewsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    author: '',
    dateRange: { from: null, to: null },
    type: '',
    keyword: '',
  })
  const [isDarkMode, setIsDarkMode] = useState(false)

  const fetchNewsData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('https://newsdata.io/api/1/latest?apikey=pub_6175242f1e2d2e403c327f9815234b5a6c401&country=us&prioritydomain=top');
      const data = await response.json();
      if (data.status === 'success') {
        setNewsData(data.results);
        setError(null);
      } else {
        throw new Error(data.results?.message || 'Failed to fetch news data');
      }
    } catch (err) {
      setError('Failed to fetch news data. Please try again later.');
      console.error('Error fetching news data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNewsData()
  }, [fetchNewsData])

  const handleFilterChange = useCallback((key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

    const handleDateRangeChange = useCallback((range: any) => {
    handleFilterChange('dateRange', range)
  }, [handleFilterChange])

  const handleTypeChange = useCallback((value: string) => {
    handleFilterChange('type', value)
  }, [handleFilterChange])

  const filteredNews = useMemo(() => {
    return newsData.filter((item: any) => {
      return (
        (filters.author ? item.creator?.some((creator: string) => creator.toLowerCase().includes(filters.author.toLowerCase())) : true) &&
        (filters.type ? item.category?.some((category: string) => category.toLowerCase() === filters.type.toLowerCase()) : true) &&
        (filters.keyword ? item.title.toLowerCase().includes(filters.keyword.toLowerCase()) : true)
      )
    })
  }, [newsData, filters])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  if (!user) {
    return <div>Please log in to access the dashboard.</div>
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-800 dark:text-indigo-200">News Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button onClick={toggleDarkMode} variant="outline" size="icon">
              {isDarkMode ? <SunIcon className="h-[1.2rem] w-[1.2rem]" /> : <MoonIcon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
            <Button onClick={logout}>Logout</Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Total Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{newsData.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Unique Authors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                {new Set(newsData.flatMap((item: any) => item.creator || [])).size}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Article Types</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-pink-600 dark:text-pink-400">
                {new Set(newsData.flatMap((item: any) => item.category || [])).size}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  placeholder="Filter by author"
                  value={filters.author}
                  onChange={(e) => handleFilterChange('author', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="date-range">Date Range</Label>
                {/* <DateRangePicker onSelect={useCallback((range) => handleFilterChange('dateRange', range), [])} /> */}
                <DateRangePicker onSelect={handleDateRangeChange} />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                {/* <Select onValueChange={useCallback((value) => handleFilterChange('type', value), [])}> */}
                <Select onValueChange={handleTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(new Set(newsData.flatMap((item: any) => item.category || []))).map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="keyword">Keyword Search</Label>
                <Input
                  id="keyword"
                  placeholder="Search by keyword"
                  value={filters.keyword}
                  onChange={(e) => handleFilterChange('keyword', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {loading && <p className="text-center text-lg">Loading news data...</p>}
        {error && <p className="text-center text-lg text-red-500">{error}</p>}

        {!loading && !error && (
          <Tabs defaultValue="table" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="chart">Chart View</TabsTrigger>
              <TabsTrigger value="payout">Payout Calculator</TabsTrigger>
              <TabsTrigger value="export">Export Options</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <NewsTable data={filteredNews} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="chart">
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <NewsChart data={filteredNews} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payout">
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <PayoutCalculator data={filteredNews} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="export">
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <ExportOptions data={filteredNews} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}

