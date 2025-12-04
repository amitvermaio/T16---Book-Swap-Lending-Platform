"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, TrendingUp } from "lucide-react"

interface Transaction {
  id: string
  bookTitle: string
  author: string
  borrower: string
  borrowDate: string
  returnDate: string
  type: "borrowed" | "lent"
  status: "active" | "returned" | "overdue"
  condition: string
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    bookTitle: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    borrower: "Sarah Martinez",
    borrowDate: "2024-01-15",
    returnDate: "2024-01-29",
    type: "lent",
    status: "returned",
    condition: "Good",
  },
  {
    id: "2",
    bookTitle: "Dune",
    author: "Frank Herbert",
    borrower: "You",
    borrowDate: "2024-01-20",
    returnDate: "2024-02-03",
    type: "borrowed",
    status: "active",
    condition: "Excellent",
  },
  {
    id: "3",
    bookTitle: "Atomic Habits",
    author: "James Clear",
    borrower: "Michael Park",
    borrowDate: "2024-01-10",
    returnDate: "2024-01-24",
    type: "lent",
    status: "overdue",
    condition: "Good",
  },
  {
    id: "4",
    bookTitle: "To Kill a Mockingbird",
    author: "Harper Lee",
    borrower: "You",
    borrowDate: "2024-01-25",
    returnDate: "2024-02-08",
    type: "borrowed",
    status: "active",
    condition: "Good",
  },
  {
    id: "5",
    bookTitle: "The Midnight Library",
    author: "Matt Haig",
    borrower: "Emily Rodriguez",
    borrowDate: "2024-01-05",
    returnDate: "2024-01-19",
    type: "lent",
    status: "returned",
    condition: "Excellent",
  },
]

const borrowingTrendData = [
  { month: "Jan", borrowed: 4, lent: 6 },
  { month: "Feb", borrowed: 3, lent: 5 },
  { month: "Mar", borrowed: 5, lent: 7 },
  { month: "Apr", borrowed: 4, lent: 6 },
  { month: "May", borrowed: 6, lent: 8 },
  { month: "Jun", borrowed: 5, lent: 9 },
]

const popularBooksData = [
  { name: "The Great Gatsby", value: 12 },
  { name: "Dune", value: 10 },
  { name: "Atomic Habits", value: 8 },
  { name: "To Kill a Mockingbird", value: 7 },
  { name: "The Midnight Library", value: 6 },
]

const COLORS = ["#8B7355", "#D4A574", "#E8B4A8", "#B89968", "#A0826D"]

export default function BorrowingHistory() {
  const [filterType, setFilterType] = useState<"all" | "borrowed" | "lent">("all")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "returned" | "overdue">("all")

  const filteredTransactions = mockTransactions.filter(
    (t) => (filterType === "all" || t.type === filterType) && (filterStatus === "all" || t.status === filterStatus),
  )

  const stats = {
    totalBorrowed: mockTransactions.filter((t) => t.type === "borrowed").length,
    totalLent: mockTransactions.filter((t) => t.type === "lent").length,
    activeLoans: mockTransactions.filter((t) => t.status === "active").length,
    overdue: mockTransactions.filter((t) => t.status === "overdue").length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "returned":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Borrowing History & Analytics</h1>
          <p className="text-muted-foreground">Track your transactions and analyze your reading habits</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{stats.totalBorrowed}</p>
                <p className="text-sm text-muted-foreground mt-2">Books Borrowed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">{stats.totalLent}</p>
                <p className="text-sm text-muted-foreground mt-2">Books Lent</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-500">{stats.activeLoans}</p>
                <p className="text-sm text-muted-foreground mt-2">Active Loans</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-red-500">{stats.overdue}</p>
                <p className="text-sm text-muted-foreground mt-2">Overdue</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Borrowing Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Borrowing Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={borrowingTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="borrowed" stroke="#8B7355" strokeWidth={2} />
                  <Line type="monotone" dataKey="lent" stroke="#D4A574" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Popular Books Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Most Borrowed Books</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={popularBooksData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8B7355" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Popular Genres Pie Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Popular Genres in Community</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Fiction", value: 35 },
                    { name: "Non-Fiction", value: 25 },
                    { name: "Mystery", value: 20 },
                    { name: "Science Fiction", value: 15 },
                    { name: "Other", value: 5 },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8B7355"
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as "all" | "borrowed" | "lent")}
            className="px-4 py-2 border border-input rounded-lg bg-background text-foreground"
          >
            <option value="all">All Transactions</option>
            <option value="borrowed">Books Borrowed</option>
            <option value="lent">Books Lent</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "returned" | "overdue")}
            className="px-4 py-2 border border-input rounded-lg bg-background text-foreground"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="returned">Returned</option>
            <option value="overdue">Overdue</option>
          </select>

          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Book Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Author</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Party</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Borrow Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Return Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-border hover:bg-muted transition">
                      <td className="py-3 px-4 text-foreground font-medium">{transaction.bookTitle}</td>
                      <td className="py-3 px-4 text-muted-foreground">{transaction.author}</td>
                      <td className="py-3 px-4 text-muted-foreground">{transaction.borrower}</td>
                      <td className="py-3 px-4 text-muted-foreground">{transaction.borrowDate}</td>
                      <td className="py-3 px-4 text-muted-foreground">{transaction.returnDate}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(transaction.status)}`}
                        >
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
