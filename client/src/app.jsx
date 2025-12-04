import { useState } from 'react'
import BookCatalog from './components/books/book-catalog'
import { Input } from './components/ui/input'
import { BookOpen } from 'lucide-react'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <BookOpen className="h-8 w-8" />
              <h1 className="text-3xl font-bold tracking-tight">BookSwap</h1>
            </div>
            <p className="text-muted-foreground max-w-[600px]">
              Discover your next read from our community. Borrow, lend, or swap books with neighbors.
            </p>
            
            {/* Search Bar */}
            <div className="w-full max-w-md mt-6">
              <Input
                type="text"
                placeholder="Search by title or author..."
                className="w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <BookCatalog searchTerm={searchTerm} />
      </main>
    </div>
  )
}

export default App