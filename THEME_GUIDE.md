# Theme Switching Guide

## Overview
The application now supports 32+ beautiful themes that users can switch between to personalize their experience. Themes are automatically saved to localStorage and persist across sessions.

## Features
- **32+ Themes**: Including light, dark, vibrant, pastel, material design, retro, and professional themes
- **Real-time Preview**: See theme colors before applying
- **Search Functionality**: Quickly find your favorite theme
- **Persistent Selection**: Your theme choice is saved automatically
- **Smooth Transitions**: All color changes are animated

## Using the Theme Switcher

### Accessing the Theme Switcher
1. Look for the **palette icon** (🎨) in the top-right corner of the navigation bar
2. Click the palette icon to open the theme selector modal

### Selecting a Theme
1. Browse through the available themes in the grid
2. Use the search box to filter themes by name
3. Each theme card shows:
   - Three color circles (primary, secondary, accent)
   - Background preview
   - Theme name
4. Click on any theme card to apply it instantly
5. The selected theme will have a checkmark indicator
6. Click outside the modal or press ESC to close

## Available Theme Categories

### Light Themes
- **Default**: Clean indigo and amber design
- **Ocean**: Calming blue tones
- **Sunset**: Warm orange and purple
- **Forest**: Natural green shades
- **Lavender**: Soft purple hues
- **Rose**: Elegant pink tones

### Dark Themes
- **Dark Default**: Modern dark UI
- **Dark Ocean**: Deep blue darkness
- **Dark Forest**: Dark green ambiance
- **Dark Purple**: Rich purple night mode

### Vibrant Themes
- **Neon Cyan**: Bright cyan and pink
- **Neon Pink**: Bold pink and yellow
- **Electric Blue**: Energetic blue and cyan

### Pastel Themes
- **Pastel Pink**: Soft pink and lavender
- **Pastel Blue**: Gentle blue and mint
- **Pastel Mint**: Light mint and coral

### Material Design Themes
- **Material Indigo**: Google Material indigo
- **Material Teal**: Google Material teal
- **Material Deep Orange**: Google Material orange

### Monochrome Themes
- **Grayscale**: Pure grayscale design
- **Black & White**: High contrast

### Nature Themes
- **Autumn**: Fall colors
- **Spring**: Fresh spring tones
- **Winter**: Cool winter palette

### Retro Themes
- **Retro 80s**: Nostalgic 80s neon
- **Retro 90s**: Classic 90s web

### Professional Themes
- **Corporate**: Business blue
- **Elegant**: Sophisticated dark blue
- **Minimalist**: Clean neutral tones

### Candy Themes
- **Candy Pop**: Sweet colorful palette
- **Blueberry**: Berry-inspired design

### Tech Themes
- **Hacker**: Terminal green
- **Cyberpunk**: Futuristic neon

## Technical Details

### CSS Variables
Each theme sets 11 CSS custom properties:
- `--color-primary`: Main brand color
- `--color-secondary`: Secondary color
- `--color-accent`: Accent highlights
- `--color-background`: Page background
- `--color-surface`: Card/surface backgrounds
- `--color-text`: Primary text color
- `--color-text-secondary`: Secondary text
- `--color-border`: Border colors
- `--color-success`: Success states
- `--color-warning`: Warning states
- `--color-error`: Error states

### Using Theme Variables in Your Code
You can use theme colors in your components:

```jsx
// Using inline styles
<div style={{
  backgroundColor: 'var(--color-primary)',
  color: 'var(--color-text)'
}}>
  Themed content
</div>
```

```css
/* Using in CSS */
.my-element {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text);
}
```

### Storage
Theme preferences are stored in localStorage under the key `selectedTheme`. The default theme is 'default' if no preference is saved.

## Adding New Themes

To add a new theme, edit `client/src/context/ThemeContext.jsx`:

```jsx
export const themes = {
  // ... existing themes ...
  
  myNewTheme: {
    name: 'My New Theme',
    primary: '#YOUR_PRIMARY_COLOR',
    secondary: '#YOUR_SECONDARY_COLOR',
    accent: '#YOUR_ACCENT_COLOR',
    background: '#YOUR_BG_COLOR',
    surface: '#YOUR_SURFACE_COLOR',
    text: '#YOUR_TEXT_COLOR',
    textSecondary: '#YOUR_SECONDARY_TEXT',
    border: '#YOUR_BORDER_COLOR',
    success: '#10B981',  // or customize
    warning: '#F59E0B',  // or customize
    error: '#EF4444'     // or customize
  }
};
```

## Troubleshooting

### Theme not applying
1. Check browser console for errors
2. Verify localStorage is enabled
3. Try clearing localStorage and selecting theme again

### Colors look wrong
1. Ensure you're using the latest code
2. Hard refresh the browser (Ctrl+F5)
3. Check if Tailwind CSS is properly configured

### Theme not persisting
1. Check if localStorage is blocked by browser
2. Verify ThemeProvider is wrapping the entire app in App.jsx
3. Ensure cookies/storage permissions are enabled

## Best Practices

1. **Choose themes that match your workflow**: Light themes for daytime coding, dark themes for evening
2. **Test theme with your content**: Some themes work better with certain color schemes
3. **Consider accessibility**: High contrast themes like "Black & White" are great for visibility
4. **Save your favorite**: The theme persists, so pick one that reduces eye strain

## Keyboard Shortcuts (Future Enhancement)
Currently, themes are selected via the UI. Future versions may include:
- `Ctrl+Shift+T`: Open theme switcher
- `1-9`: Quick select first 9 themes
- `N`: Next theme
- `P`: Previous theme

---

**Note**: All themes are designed to maintain proper contrast ratios for accessibility. If you have specific color requirements or accessibility needs, consider using themes with higher contrast or customizing the theme colors.
