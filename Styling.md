# Styling Guide 🎨

## Table of Contents
- [Color Palette](#color-palette)
- [CSS Variables](#css-variables)
- [Utility Classes](#utility-classes)
- [Common Patterns](#common-patterns)
- [Animations & Transitions](#animations--transitions)
- [Responsive Design](#responsive-design)

## Color Palette

### Cozy Cabin Theme

css
:root {
/ Wood Tones /
--wood-dark: #5C4033; / Deep brown for shadows and text /
--wood-medium: #8B7355; / Medium brown for borders /
--wood-light: #DEB887; / Light brown for backgrounds /
/ Accent Colors /
--sunlight: #FFE5B4; / Warm glow effect /
--cabin-shadow: #2C1810; / Deep shadow color /
--spice-red: #8B4513; / Warm accent for highlights /
--herb-green: #556B2F; / Natural accent color /
/ Theme Colors /
--background: #FDF5E6; / Warm off-white /
--foreground: #2C1810; / Text color /
}

### Dark Mode Variants

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #2C1810;
    --foreground: #DEB887;
    --sunlight: #8B4513;
  }
}
```

## Utility Classes

### Gradient Borders

```css
.cabin-border {
  @apply border-2 border-[var(--wood-medium)] rounded-lg shadow-lg relative;
  background: linear-gradient(
    to bottom right,
    var(--wood-light),
    var(--wood-medium)
  );
  box-shadow: 
    0 4px 6px var(--cabin-shadow),
    inset 0 1px 0 var(--sunlight);
}
```

### Interactive Buttons
```css
.cabin-button {
  @apply px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105;
  background: linear-gradient(
    to bottom,
    var(--wood-medium),
    var(--wood-dark)
  );
  border: 2px solid var(--wood-light);
  box-shadow: 
    0 4px 6px var(--cabin-shadow),
    inset 0 1px 0 var(--sunlight);
}
```

### Cards with Hover Effects
```css
.recipe-card {
  @apply cabin-border p-6 hover:scale-105 transition-all duration-300;
  transform-origin: center;
}

.recipe-card:hover {
  box-shadow: 
    0 8px 12px var(--cabin-shadow),
    inset 0 1px 0 var(--sunlight);
}
```

## Common Patterns

### Subtle Wood Grain Effect
```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.15' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E");
  opacity: 0.15;
  pointer-events: none;
  z-index: 1;
}
```

### Sunlight Gradient Background
```css
.sunlight-gradient {
  background: linear-gradient(
    120deg,
    var(--sunlight) 0%,
    var(--background) 15%,
    var(--background) 85%,
    var(--sunlight) 100%
  );
}
```

## Tailwind Configuration

### Extended Theme
```typescript
const config: Config = {
  theme: {
    extend: {
      scale: {
        '102': '1.02',
      },
      colors: {
        'wood-dark': 'var(--wood-dark)',
        'wood-medium': 'var(--wood-medium)',
        'wood-light': 'var(--wood-light)',
        'sunlight': 'var(--sunlight)',
        'cabin-shadow': 'var(--cabin-shadow)',
        'spice-red': 'var(--spice-red)',
        'herb-green': 'var(--herb-green)',
      },
    },
  },
};
```

## Responsive Design Patterns

### Grid Layouts
```jsx
// Basic responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

// Two-column layout with sidebar
<div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">

// Feature grid
<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
```

### Spacing & Typography
```jsx
// Responsive padding
<div className="p-4 sm:p-6 lg:p-8">

// Responsive text
<h1 className="text-2xl sm:text-4xl lg:text-6xl">

// Responsive stack
<div className="space-y-4 sm:space-y-6 lg:space-y-8">
```

## Animation Examples

### Hover Transitions
```css
.hover-lift {
  @apply transition-all duration-300 hover:scale-105 hover:-translate-y-1;
}

.hover-glow {
  @apply transition-all duration-300;
  &:hover {
    box-shadow: 0 0 20px var(--sunlight);
  }
}
```

### Loading States
```css
.loading-pulse {
  @apply animate-pulse bg-wood-light/50;
}

.loading-spin {
  @apply animate-spin text-wood-medium;
}
```

## Best Practices

1. **Layer Organization**
   - Use `@layer` directives to organize styles
   - Keep component styles in the components layer
   - Use utilities layer for small, reusable styles

2. **Variable Usage**
   - Use CSS variables for theme colors and values that change
   - Keep related variables grouped together
   - Provide dark mode variants

3. **Performance**
   - Use `transform-gpu` for hardware-accelerated animations
   - Avoid expensive animations on mobile
   - Use `will-change` sparingly

4. **Accessibility**
   - Maintain sufficient color contrast
   - Provide focus states for interactive elements
   - Support reduced motion preferences
