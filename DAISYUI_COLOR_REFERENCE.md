# DaisyUI Color System Reference

## Quick Color Mapping

### Text Colors
```
text-base-content         → Primary text (adjusts per theme)
text-base-content/60      → Secondary text (60% opacity)
text-base-content/40      → Tertiary text (40% opacity)
text-primary              → Primary action text
text-primary-content      → Text on primary backgrounds
```

### Background Colors
```
bg-base-100               → Main card/component background
bg-base-200               → Page background, hover states
bg-base-300               → Disabled, inactive backgrounds
bg-primary                → Primary action buttons
bg-primary/10             → Light primary tint
bg-primary/20             → Medium primary tint
bg-secondary              → Secondary action
bg-accent                 → Accent/highlight
```

### Border Colors
```
border-base-300           → All borders (standard)
border-base-200           → Subtle borders
```

## NO LONGER USED
- ❌ `dark:` prefixed classes
- ❌ `bg-white`, `bg-black`
- ❌ `text-slate-*`, `text-gray-*`
- ❌ `bg-slate-*`, `bg-gray-*`
- ❌ `border-slate-*`, `border-gray-*`
- ❌ `bg-indigo-*`, `text-indigo-*`
- ❌ `bg-purple-*`, `text-purple-*`

## How Theme Switching Works

1. **User clicks theme in ThemeSwitcher**
   - Selected theme name stored in localStorage
   - `data-theme` attribute set on `<html>`

2. **DaisyUI CSS variables update automatically**
   - `--p` (primary), `--s` (secondary), `--a` (accent) change
   - `--b1`, `--b2`, `--b3` (base 100, 200, 300) change
   - `--bc` (base content) text color changes

3. **All components using semantic colors update instantly**
   - No page reload needed
   - Smooth transition with CSS

## Testing a New Theme

To test if theme switching works:
1. Open browser DevTools Console (F12)
2. Type: `document.documentElement.getAttribute('data-theme')`
3. Should show current theme name (e.g., "cupcake", "dark")
4. Type: `getComputedStyle(document.documentElement).getPropertyValue('--p')`
5. Should show HSL values like "259 94% 51%"

If both commands return correct values → **Theme is working! ✅**

## Common Patterns Used

### Card Component
```jsx
<div className="bg-base-100 border border-base-300 p-6 rounded-2xl shadow-sm">
  <h3 className="text-base-content font-bold">Title</h3>
  <p className="text-base-content/60">Description</p>
</div>
```

### Button
```jsx
<button className="bg-primary hover:bg-primary/90 text-primary-content px-4 py-2 rounded-lg">
  Click Me
</button>
```

### Form Input
```jsx
<input
  className="w-full px-4 py-2 border border-base-300 bg-base-100 text-base-content rounded-lg"
  placeholder="Enter text..."
/>
```

### Empty State
```jsx
<div className="text-center py-12">
  <p className="text-base-content/60">No items found</p>
</div>
```
