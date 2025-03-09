# Team Coding Rules and Standards

This document outlines the coding standards, best practices, and conventions that all team members should follow when contributing to this project.

## Table of Contents

- [Code Formatting](#code-formatting)
- [Naming Conventions](#naming-conventions)
- [JavaScript/TypeScript Guidelines](#javascripttypescript-guidelines)
- [React Best Practices](#react-best-practices)
- [CSS/SCSS Guidelines](#cssscss-guidelines)
- [Git Workflow](#git-workflow)
- [Code Review Process](#code-review-process)
- [Documentation](#documentation)

## Code Formatting

We use Prettier for automatic code formatting. The configuration is defined in `.prettierrc` at the root of the project.

- **Line Length**: Maximum 80 characters
- **Indentation**: 2 spaces (no tabs)
- **Quotes**: Single quotes for JavaScript/TypeScript, double quotes for JSX attributes
- **Semicolons**: Required
- **Trailing Commas**: ES5 compatible (objects, arrays, etc.)
- **Bracket Spacing**: Spaces between brackets in object literals
- **Arrow Function Parentheses**: Always include parentheses around arrow function parameters

Run Prettier before committing your code:

```bash
npm run format
```

## Naming Conventions

- **Files and Directories**:

  - React components: PascalCase (e.g., `UserProfile.tsx`, `Button.tsx`)
  - Utilities and helpers: camelCase (e.g., `formatDate.ts`, `apiUtils.ts`)
  - Test files: Same name as the file being tested with `.test` or `.spec` suffix
  - CSS/SCSS modules: Same name as the component they style

- **Code Identifiers**:
  - Classes/Components: PascalCase (e.g., `UserProfile`, `Button`)
  - Functions/Methods: camelCase (e.g., `getUserData()`, `calculateTotal()`)
  - Variables: camelCase (e.g., `userData`, `isLoading`)
  - Constants: UPPER_SNAKE_CASE (e.g., `API_URL`, `MAX_RETRY_COUNT`)
  - Boolean variables: Should start with "is", "has", or "should" (e.g., `isVisible`, `hasData`)
  - Interfaces/Types (TypeScript): PascalCase with no prefix (e.g., `User`, `ButtonProps`)

## JavaScript/TypeScript Guidelines

- Use TypeScript for all new code
- Always define proper types and interfaces
- Avoid using `any` type unless absolutely necessary
- Use ES6+ features when appropriate (arrow functions, destructuring, spread operator, etc.)
- Prefer `const` over `let`, avoid `var`
- Use async/await instead of raw promises when possible
- Keep functions small and focused on a single responsibility
- Avoid deep nesting of conditionals and loops
- Use early returns to reduce nesting
- Add proper error handling for async operations

## React Best Practices

- Use functional components with hooks instead of class components
- Keep components small and focused on a single responsibility
- Extract reusable logic into custom hooks
- Use React context for state that needs to be accessed by many components
- Memoize expensive calculations with `useMemo` and `useCallback` when appropriate
- Avoid inline function definitions in render methods when possible
- Use proper key props in lists (avoid using array index as key)
- Destructure props for clarity
- Use prop-types or TypeScript interfaces for component props
- Follow the container/presentational component pattern when appropriate

## CSS/SCSS Guidelines

- Use CSS modules or styled-components for component styling
- Follow BEM naming convention if using global CSS classes
- Use variables for colors, spacing, and other repeated values
- Keep selectors simple and avoid deep nesting
- Use flexbox or grid for layouts
- Ensure responsive design for all components
- Avoid using `!important` unless absolutely necessary

## Git Workflow

- Create feature branches from `develop` branch
- Use descriptive branch names: `feature/feature-name`, `bugfix/issue-description`, etc.
- Make small, focused commits with clear messages
- Write commit messages in the imperative mood (e.g., "Add user authentication" not "Added user authentication")
- Include issue/ticket numbers in commit messages when applicable
- Rebase feature branches on `develop` before creating pull requests
- Squash commits before merging if necessary for a clean history

## Code Review Process

- All code must be reviewed before merging to `develop` or `main`
- At least one approval is required before merging
- Reviewers should check for:
  - Code correctness and functionality
  - Adherence to coding standards
  - Potential bugs or edge cases
  - Performance issues
  - Security concerns
  - Test coverage
- Address all review comments before merging
- Be respectful and constructive in code review comments

## Documentation

- Add JSDoc comments for functions and components
- Include a README.md file for each major feature or module
- Document complex algorithms or business logic
- Keep documentation up-to-date when changing code
- Add inline comments for non-obvious code sections
- Document known limitations or edge cases

---

These rules are meant to ensure code quality and consistency across the project. If you have suggestions for improvements, please discuss them with the team.
