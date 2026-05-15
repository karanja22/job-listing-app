# Job Listings Platform (React)

## Setup Instructions

### Prerequisites (Assumptions)

Before running this project, ensure you have the following installed:

- Node.js (v18 or higher) — required to run the React development environment
- npm (v9 or higher) — comes with Node.js for managing dependencies
- Git — required for cloning the repository
- A modern browser (Chrome, Firefox, Edge)
- Internet connection (for installing dependencies)

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate into the project folder
cd job-listings-app

# Install dependencies
npm install

# Start development server
npm run dev
```

## Features

- Sticky header with navigation links (Home, Jobs, Post a Job, Sign In)

- Real-time search and filtering:
  - Category filter
  - Location filter
  - Budget range filter

- Dynamic job listings from local JSON data

- Responsive grid layout:
  - 3 columns on desktop
  - 2 columns on tablet
  - 1 column on mobile

- Loading skeleton with 1.5s simulated delay

- Empty state when no jobs match filters

- Job detail modal with full job information

- Proposal submission form with validation:
  - Cover letter (min 100 characters)
  - Budget input
  - Timeline input (days)
  - Optional portfolio URL

- Inline form validation (no browser alerts)

- Keyboard accessible modal (Escape + click outside to close)

- Sorting options:
  - Newest
  - Budget (high to low)
  - Budget (low to high)
  - Most proposals

- Error handling with retry button

## AI Tools Used

### ChatGPT (OpenAI)

- Used for React component structure and architecture planning
- Assisted with UI/UX improvements and form validation logic
- Helped refine state management and filtering logic

### Claude (Anthropic)

- Used for additional UI/UX refinement suggestions
- Assisted in improving readability and code clarity during development
