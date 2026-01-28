# AGENTS.md - Hacker News Clone

This file contains guidelines for agentic coding assistants working in this repository.

## Project Overview

A Hacker News clone built with React, Vite, and the Algolia Hacker News API. Uses React Router for client-side routing.

## Build, Lint, and Test Commands

### Development
```bash
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint on all files
```

### Testing
No test framework is currently configured. To add tests, consider using Vitest (recommended for Vite projects).

### Linting Specific Files
```bash
npx eslint src/components/StoryItem.jsx      # Lint single file
npx eslint src/components/*.jsx              # Lint all components
npx eslint --fix src/App.jsx                 # Auto-fix issues
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Comment.jsx      # Individual comment display (recursive)
│   ├── Search.jsx       # Search functionality
│   ├── StoryDetail.jsx  # Story detail view with comments
│   ├── StoryItem.jsx    # Individual story item
│   └── StoryList.jsx    # List of stories with pagination
├── services/
│   └── api.js           # Algolia HN API service functions
├── App.jsx              # Main app with router setup
├── App.css              # Global styles
├── main.jsx             # App entry point
└── index.css            # Base CSS reset
```

## Code Style Guidelines

### File Naming
- Components: PascalCase (e.g., `StoryItem.jsx`, `StoryDetail.jsx`)
- Services/utilities: camelCase (e.g., `api.js`)
- Styles: Match component name (e.g., `App.css`)

### Import Order
1. External dependencies (React, React Router, etc.)
2. Internal components
3. Services/utilities
4. Styles

Example:
```javascript
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import { fetchStoryById } from '../services/api';
```

### Component Structure
- Use functional components with hooks
- Use `const` for component declarations
- Default export at the end of file
- Organize hooks at the top (useState, useEffect, useParams, etc.)

Example:
```javascript
import { useState, useEffect } from 'react';

const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  const handleEvent = () => {
    // Handler logic
  };
  
  return (
    <div className="component-name">
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

### Naming Conventions
- **Components**: PascalCase (e.g., `StoryList`, `StoryDetail`)
- **Functions**: camelCase (e.g., `fetchTopStories`, `handleLoadMore`)
- **Variables**: camelCase (e.g., `activeTab`, `selectedStoryId`)
- **Constants**: UPPER_SNAKE_CASE or camelCase for local (e.g., `BASE_URL`)
- **CSS classes**: kebab-case (e.g., `story-item`, `comment-header`)

### Formatting
- **Indentation**: 2 spaces (no tabs)
- **Line length**: Aim for ~80-100 characters, but flexible
- **Semicolons**: Optional but consistent (currently using semicolons)
- **Quotes**: Single quotes for JS, double quotes for JSX attributes
- **Trailing commas**: Not required

### React Patterns
- **Props destructuring**: In function parameters when possible
- **State management**: Use `useState` for component state
- **Side effects**: Use `useEffect` for API calls, subscriptions
- **Conditional rendering**: Use ternary operators or `&&`
- **Key props**: Use unique IDs, fallback to index only when necessary

### Error Handling
- Wrap async operations in try/catch blocks
- Set error state for user-facing errors
- Display error messages in UI (see `StoryList.jsx` line 45-47)
- Check response.ok before parsing JSON
- Provide meaningful error messages

Example:
```javascript
try {
  setLoading(true);
  setError(null);
  const data = await fetchStoryById(id);
  setStory(data);
} catch (err) {
  setError(err.message);
} finally {
  setLoading(false);
}
```

### API Service Pattern
- Centralize API calls in `src/services/api.js`
- Export named async functions
- Check `response.ok` before parsing
- Throw errors with descriptive messages
- Use default parameters for optional arguments

### Routing
- Use React Router v6 patterns
- Route paths:
  - `/` - Top stories
  - `/new` - New stories
  - `/search` - Search page
  - `/story/:id` - Story detail
- Use `<Link>` for internal navigation
- Use `useParams()` for URL parameters
- Use `useNavigate()` for programmatic navigation

### Styling
- Use plain CSS (no preprocessors)
- Component-specific classes prefixed with component name
- Follow Hacker News design: orange (#ff6600), beige (#f6f6ef), gray (#828282)
- Keep spacing tight (current: 0.25rem padding between stories)
- Mobile-first responsive design

### ESLint Rules
- Follows `@eslint/js` recommended config
- React Hooks rules enforced
- Unused variables allowed if they start with uppercase (components)
- ECMAScript 2020 features enabled

## Common Tasks

### Adding a New Route
1. Add route in `App.jsx` `<Routes>` section
2. Create corresponding component in `src/components/`
3. Update navigation in `Header` component if needed

### Adding a New API Endpoint
1. Add function to `src/services/api.js`
2. Follow existing pattern: async function, check response.ok, return JSON
3. Use descriptive error messages

### Styling a Component
1. Add CSS to `App.css` with component-specific class prefix
2. Use existing color variables for consistency
3. Test spacing to ensure it matches HN design

## Best Practices

- **Don't over-engineer**: Keep it simple, this is a small app
- **Consistency**: Follow existing patterns in the codebase
- **Accessibility**: Use semantic HTML elements
- **Performance**: Avoid unnecessary re-renders, use keys properly
- **User Experience**: Show loading/error states, provide feedback

## Notes for Agents

- This project uses Vite (not Create React App)
- No TypeScript - use plain JavaScript (.jsx files)
- No testing framework currently set up
- No state management library (just React hooks)
- The app mimics Hacker News UI/UX closely
