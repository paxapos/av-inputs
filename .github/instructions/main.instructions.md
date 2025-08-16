---
applyTo: '**'
---

# StencilJS Web Components Project

## Project Overview
Proyecto en StencilJS para la creación de web components nativos que sirvan en otros proyectos. Se usa GitHub Actions para deployar.

## Development Standards & Best Practices

### Code Formatting & Quality
- **ALWAYS** use the project's Prettier configuration for code formatting
- Run `npm run format` before committing any code
- Ensure all files pass `npm run lint` without errors
- Follow the existing `.prettierrc` and ESLint configurations
- Use TypeScript strict mode for better type safety

### StencilJS Component Standards

#### Component Architecture
- Use functional component pattern with decorators
- Follow PascalCase for component class names (e.g., `MyButton`, `InputField`)
- Use kebab-case for custom element tag names (e.g., `<my-button>`, `<input-field>`)
- Organize components in logical folders: `src/components/category/component-name/`
- Each component should have its own folder with: `.tsx`, `.css`, `.spec.tsx`, and `readme.md`

#### Props & State Management
```typescript
// Use proper TypeScript interfaces for props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

@Component({
  tag: 'av-button',
  styleUrl: 'button.css',
  shadow: true
})
export class Button {
  @Prop() variant: ButtonProps['variant'] = 'primary';
  @State() isLoading: boolean = false;
  @Event() buttonClick: EventEmitter<MouseEvent>;
}
```

#### Styling Guidelines
- Use CSS custom properties for theming and consistency
- Implement CSS-in-JS only when necessary, prefer external CSS files
- Use `:host` selector for component root styling
- Follow BEM methodology for CSS class naming
- Implement responsive design using modern CSS (Grid, Flexbox, Container Queries)
- Support both light and dark themes via CSS custom properties

#### Accessibility Requirements
- Always include proper ARIA attributes (`aria-label`, `role`, etc.)
- Ensure full keyboard navigation support
- Use semantic HTML elements as base
- Test with screen readers and accessibility tools
- Include focus management and focus indicators
- Support high contrast mode

#### Performance Optimization
- Use `@Element()` decorator to access host element efficiently
- Implement lazy loading for heavy components
- Optimize bundle size by tree-shaking unused code
- Use `componentWillLoad()` for async initialization
- Implement virtual scrolling for large lists
- Use `@Watch()` decorators judiciously to avoid unnecessary re-renders

### Testing Standards
- Write comprehensive unit tests using Jest and Stencil testing utilities
- Maintain minimum 85% code coverage
- Test all public props, methods, events, and edge cases
- Include visual regression tests for complex components
- Use Page Object Model pattern for e2e tests
- Test accessibility compliance

### Documentation Requirements
- Document all public APIs using JSDoc with TypeScript types
- Include usage examples and code snippets
- Maintain component catalog with Storybook
- Update README.md with installation and usage instructions
- Document breaking changes in CHANGELOG.md
- Include accessibility guidelines for each component

### Git Workflow & CI/CD
- Use conventional commits format: `type(scope): description`
- Create feature branches from `main`: `feature/component-name`
- Require PR reviews and status checks before merging
- Run automated tests, linting, and security scans in GitHub Actions
- Auto-generate releases and documentation on merge to main
- Deploy to npm registry and GitHub Pages automatically

### Build & Distribution
- Build components for multiple output targets (ES modules, CommonJS, UMD)
- Generate type definitions for TypeScript consumers
- Create framework-specific wrappers (React, Vue, Angular) when needed
- Optimize bundle size and tree-shaking support
- Version components semantically and document breaking changes

### Security & Maintenance
- Keep dependencies updated and audit for vulnerabilities
- Sanitize user inputs and prevent XSS attacks
- Use Content Security Policy headers
- Regular dependency updates via automated PRs
- Monitor bundle size and performance metrics

### Code Review Checklist
- [ ] Code follows Prettier formatting
- [ ] All tests pass and coverage is maintained
- [ ] Component is accessible (ARIA, keyboard nav)
- [ ] Documentation is updated
- [ ] No console.log or debugging code
- [ ] TypeScript types are properly defined
- [ ] CSS follows design system guidelines
- [ ] Performance considerations addressed
