# Book Swap & Lending Platform - Frontend Architecture

## 1. Application Tree Structure

This tree outlines the page hierarchy and the components nested within each view.

```text
App Root
│
├── 1. Authentication Flow
│   ├── Login Page
│   │   ├── AuthForm (Component): Email/Password inputs, "Login" button.
│   │   └── SocialLogin (Component): Google/GitHub login buttons.
│   ├── Register Page
│   │   ├── RegistrationForm (Component): Name, Email, Password, Location (for distance calc).
│   │   └── InterestTags (Component): Multi-select chips for favorite genres.
│   └── Forgot Password Page
│
├── 2. Core Layout (Wrapper for main pages)
│   ├── Navbar (Global)
│   │   ├── Logo
│   │   ├── SearchBar (Mini): Quick search by title.
│   │   ├── NotificationBell (Real-Time): Shows red dot on new alerts.
│   │   └── UserDropdown: Links to Profile, Dashboard, Logout.
│   └── Footer: Links to About, TOS, Socials.
│
├── 3. Main Application Pages
│   ├── Home / Landing Page
│   │   ├── HeroSection: "Exchange books in your neighborhood."
│   │   ├── FeaturesGrid: Icons explaining Borrow vs. Swap.
│   │   ├── RecentArrivals (Carousel): Newly listed books.
│   │   └── TopLenders: Spotlight on active users.
│   │
│   ├── Explore / Search Page
│   │   ├── FilterSidebar (Component):
│   │   │   ├── Genre Checkboxes
│   │   │   ├── Availability Toggle (Swap vs. Lend)
│   │   │   └── Distance Slider (e.g., "Within 5km").
│   │   ├── BookGrid (Component):
│   │   │   └── BookCard (Component): Cover image, Title, Author, Status Badge (Available/Swapped).
│   │   └── Pagination / InfiniteScroll.
│   │
│   └── Book Details Page (Dynamic: /book/:id)
│       ├── BookHeader: Large cover image, Title, Author, Year.
│       ├── StatusBanner: Green/Red banner showing "Available" or "Currently Lent".
│       ├── OwnerInfoCard: Owner avatar, Name, Rating (Stars), "Message Owner" button.
│       ├── ActionPanel:
│       │   ├── "Request to Borrow" Button
│       │   └── "Propose Swap" Button (Opens SwapModal).
│       └── ReviewsSection: Comments from previous borrowers.
│
├── 4. User Dashboard (Private)
│   ├── Dashboard Overview
│   │   ├── StatsCards: "Books Lent", "Books Borrowed", "Credits Earned".
│   │   └── ActiveActivityFeed: Timeline of recent requests/approvals.
│   │
│   ├── My Shelf (Inventory Management)
│   │   ├── AddBookButton: Navigates to listing form.
│   │   └── InventoryList: Table/Grid of user's books with "Edit" and "Delete" actions.
│   │
│   ├── Request Manager (Crucial for workflow)
│   │   ├── IncomingRequests (Tab):
│   │   │   └── RequestCard:
│   │   │       ├── Requester Info
│   │   │       ├── Book Requested
│   │   │       ├── Actions: [Approve] [Reject] [Chat].
│   │   └── OutgoingRequests (Tab):
│   │       └── StatusTracker: "Pending" → "Approved" → "Picked Up" → "Returned".
│   │
│   └── Add / Edit Book Page
│       ├── ISBNScanner (Optional): Camera component to scan barcode for auto-fill.
│       ├── BookForm: Title, Author, Description, Condition (New/Used).
│       ├── TypeSelector: Radio buttons for "Lend Only", "Swap Only", or "Giveaway".
│       └── ImageUpload: Drag-and-drop zone for book photos.
│
├── 5. User Profile
│   ├── Public Profile Page
│   │   ├── UserBio
│   │   ├── LibraryPreview: Subset of books they own.
│   │   └── ReputationScore: Aggregate rating based on return punctuality.
│   │
│   └── Settings Page
│       ├── NotificationPreferences: Toggle Email/SMS/Push.
│       └── LocationSettings: Update home address for geo-search.
│
└── 6. Admin Panel (Protected)
    ├── AdminDashboard: Charts for Total Users, Active Swaps, server health.
    ├── UserManagement: Table to ban/verify users.
    └── BookModeration: Queue to review reported books.


Detailed Component Descriptions

Here are the specifications for the most complex components:
A. The Book Card (Used in Grids)

    Visuals: Book cover aspect ratio (2:3).

    Data: Title (truncated), Author.

    Badges (Vital):

        Swap: Blue Badge

        Lend: Green Badge

        Distance: "1.2 km away" (Calculated based on user location).

    Interactions: Click to view details; "Heart" icon to wishlist.

B. Swap Modal (The "Transaction" Core)

    Trigger: When a user clicks "Propose Swap" on someone else's book.

    Left Side: The book they want to get.

    Right Side: A dropdown list of their own books (My Shelf) to offer in exchange.

    Logic: Only shows books from "My Shelf" that are marked as "Available."

    Footer: "Send Proposal" button.

C. Notification Bell (Navbar)

    UI: Bell icon with a badge counter (e.g., "3").

    Dropdown: List of recent alerts.

        New Request: "John wants to borrow 'Clean Code'."

        Approval: "Sarah accepted your swap request!"

        Reminder: "Please return '1984' by tomorrow."

    Action: Clicking an item takes the user directly to the relevant dashboard tab.

How to Achieve "Real-Time" Features

You need the app to update instantly without the user refreshing the page. The industry standard for this is WebSockets, specifically using Socket.IO.
1. The Architecture

    Server (Backend): Runs a Socket.IO server alongside your HTTP server (Express/Node.js). It maintains open connections with active users.

    Client (Frontend): The React/Next.js app connects to the socket server on load using socket.io-client.

2. Step-by-Step Implementation Guide

Step A: Establishing the Connection

    When a user logs in, the frontend sends a join_room event to the server with the userId.

    The server adds that socket connection to a specific "room" named after that user ID. This ensures you can send messages specifically to that user.

Step B: Handling a Borrow Request (Example Workflow)

1.   Requester (Frontend):

        User clicks "Request Book".

        API call is made to MongoDB to create the request record.

        Simultaneously, emit a socket event:

        ``` javascript
        socket.emit('send_request', {
            toUserId: bookOwnerId,
            bookTitle: 'The Alchemist',
            requesterName: 'Verma'
        });
        ```
2. Server (Backend):

    Listens for send_request.

    Forwards this data to the specific room of toUserId:
    ```js
    io.to(toUserId).emit('new_notification', data);
    ```
3. Book Owner (Frontend):

    The Navbar component is constantly listening for new_notification.

    When triggered:

        Increment the red notification badge counter.

        Show a "Toast" popup (small alert at top right): "Verma requested The Alchemist".

        Update the "Incoming Requests" list state automatically.

Step C: What events do you need? Define these specific event names in your code to keep things organized:

1.   `request_created`: Notify owner of a new borrow/swap attempt.

2.  `request_status_change`: Notify requester if they were Approved or       Rejected.

3.   `book_returned`: Notify owner that the book is marked as returned.

4.  `chat_message`: If you implement a chat feature between users.

---

3. Tech Stack Hint for Real-Time

    - Frontend: `socket.io-client` (Library). Use a `useEffect` hook in your main layout to initialize the listener once.

    - State Management: Use Context API or Redux to handle the notification counter globally so it updates everywhere in the app instantly.