# Styling Guidelines

This document describes the styling patterns and conventions used in this MapLibre GL experiment project.

## Overview

This project uses **Tailwind CSS 4.1.17** as the primary styling solution with a focus on glass morphism design patterns for UI components overlaid on the map.

## Glass Morphism Pattern

Glass morphism is the primary design aesthetic for UI components that overlay the map. This creates a modern, translucent effect that allows the map to remain visible while providing clear interactive controls.

### Core Glass Morphism Utilities

The glass morphism effect is achieved using two key Tailwind utilities:

1. **Background opacity**: `bg-{color}/{opacity}` - Creates translucent backgrounds
2. **Backdrop blur**: `backdrop-blur-{size}` - Blurs the content behind the element

### Standard Glass Morphism Components

#### Dark Glass (Primary Pattern)

Used for the main location search form container:

```tsx
className="bg-black/60 backdrop-blur-md rounded-lg shadow-lg border border-white/30"
```

- `bg-black/60`: 60% opacity black background
- `backdrop-blur-md`: Medium blur effect
- `border-white/30`: 30% opacity white border for definition
- `rounded-lg shadow-lg`: Standard corner rounding and shadow

**Where used**: LocationSearchForm.tsx:42

#### Light Glass (Secondary Pattern)

Used for the base layer control panel:

```tsx
className="bg-white/20 backdrop-blur-md rounded-lg shadow-lg border border-white/30"
```

- `bg-white/20`: 20% opacity white background
- `backdrop-blur-md`: Medium blur effect
- `border-white/30`: 30% opacity white border

**Where used**: BaseLayerControl.tsx:14

#### Semi-transparent Inputs

Form inputs use a lighter glass effect for better readability:

```tsx
className="bg-white/20 border border-white/30 text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:bg-white/30"
```

- `bg-white/20`: Base 20% opacity
- `focus:bg-white/30`: Increases to 30% on focus for better contrast
- `placeholder-white/60`: 60% opacity placeholder text

**Where used**: LocationSearchForm.tsx:82, 95

## Interactive Feedback Patterns

### Hover States

All interactive elements use smooth transitions for hover feedback:

```tsx
className="hover:bg-white/30 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-300"
```

- `transition-all duration-300`: Smooth 300ms transitions
- Increased background opacity on hover
- Custom glow effects using `shadow-[0_0_Xpx_rgba(...)]`

**Where used**: BaseLayerControl.tsx:23, LocationSearchForm.tsx:121

### Active/Selected States

Active states use blue highlighting with glow effects:

```tsx
className="bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
```

- `bg-blue-600`: Solid blue background for active state
- `shadow-[0_0_15px_rgba(59,130,246,0.5)]`: Blue glow (15px blur, 50% opacity)

**Where used**: BaseLayerControl.tsx:22, LocationSearchForm.tsx:120

### Pulsating Animation

Used on buttons to draw attention on hover:

```tsx
className="hover:animate-pulse"
```

- Only applied on hover state
- Creates subtle pulsing effect

**Where used**: LocationSearchForm.tsx:104, 121

### Timed State Transitions

Success feedback uses temporary state changes with setTimeout:

```tsx
// Green success state (800ms duration)
className={`${
  isSubmitted
    ? 'bg-green-600 shadow-[0_0_20px_rgba(34,197,94,0.6)]'
    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]'
}`}
```

Implementation pattern:
```tsx
setIsSubmitted(true);
setTimeout(() => {
  setIsSubmitted(false);
}, 800);
```

**Where used**: LocationSearchForm.tsx:101-108

## Color Palette

### Glass Backgrounds
- **Black glass**: `bg-black/60` (dark containers)
- **White glass**: `bg-white/20` (light controls)
- **Hover glass**: `bg-white/30` (hover states)
- **Focus glass**: `bg-white/30` (focused inputs)

### Borders
- **Standard border**: `border-white/30` (30% opacity white)

### Text
- **Primary text**: `text-white` (100% white on glass)
- **Placeholder text**: `placeholder-white/60` (60% opacity)

### Accent Colors
- **Primary action**: `bg-blue-600`
- **Primary hover**: `hover:bg-blue-700`
- **Success state**: `bg-green-600`
- **Error state**: `bg-red-100` with `text-red-800`

### Shadow/Glow Effects
- **Blue glow (active)**: `shadow-[0_0_15px_rgba(59,130,246,0.5)]`
- **Blue glow (hover)**: `shadow-[0_0_20px_rgba(59,130,246,0.6)]`
- **Green glow (success)**: `shadow-[0_0_20px_rgba(34,197,94,0.6)]`
- **White glow (hover)**: `shadow-[0_0_10px_rgba(255,255,255,0.3)]`

## Animation & Transitions

### Standard Transition
```tsx
className="transition-all duration-300"
```
- Applied to all interactive elements
- 300ms duration for smooth feel

### Transform Transitions
```tsx
className="transition-transform duration-300"
```
- Used for icon rotations (chevrons, etc.)
- **Example**: Accordion chevron rotation in LocationSearchForm.tsx:50

### Expandable Content
```tsx
className={`overflow-hidden transition-all duration-300 ease-in-out ${
  isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
}`}
```
- Combines max-height and opacity transitions
- `ease-in-out` easing for smooth expansion/collapse

**Where used**: LocationSearchForm.tsx:66-68

## Accessibility

### Focus States
All interactive elements include focus states:
```tsx
className="focus:outline-none focus:ring-2 focus:ring-white/50"
```
- Removes default outline
- Adds 2px ring with 50% opacity white

### ARIA Attributes
Interactive elements include appropriate ARIA labels:
```tsx
aria-label={`Switch to ${layer.label} view`}
aria-pressed={baseLayer === layer.type}
aria-expanded={isExpanded}
aria-controls="location-form-content"
```

**Where used**: BaseLayerControl.tsx:25-26, LocationSearchForm.tsx:46-47

## Layout Patterns

### Absolute Positioning
UI components use absolute positioning to overlay the map:

```tsx
className="absolute top-20 left-4"  // LocationSearchForm
className="absolute top-[280px] left-4"  // BaseLayerControl
className="absolute bottom-4 left-4"  // MapStatusIndicators
```

- Positioned from left side with 4 units (16px) margin
- Vertical position varies by component
- `max-w-sm` used for form to limit width

### Spacing
- **Component padding**: `px-4 py-3` (standard) or `p-2` (compact)
- **Internal spacing**: `space-y-4` (large gaps), `space-y-2` (small gaps), `gap-1` (flexbox minimal), `gap-2` (flexbox standard)
- **Button padding**: `px-3 py-2` (standard button size)

## Non-Glass Components

Not all components use glass morphism. Status indicators use solid backgrounds:

```tsx
// Loading/success indicators
className="bg-white px-4 py-2 rounded-lg shadow-lg"

// Error indicators
className="bg-red-100 text-red-800 px-4 py-2 rounded-lg shadow-lg"
```

**Where used**: MapStatusIndicators.tsx:19, 22, 27

## Best Practices

### When to Use Glass Morphism
-  Interactive controls that overlay the map
-  Panels that need to show map context underneath
-  Navigation or settings controls
- L Status messages (use solid backgrounds for clarity)
- L Error messages (use solid backgrounds with high contrast)

### Opacity Guidelines
- **Container backgrounds**: 20-60% opacity (lighter for subtle, darker for readable content)
- **Borders**: 30% opacity white for subtle definition
- **Placeholders**: 60% opacity for readability
- **Hover states**: Increase opacity by ~10% from base

### Performance Considerations
- Backdrop blur can be GPU-intensive
- Use `backdrop-blur-md` consistently (not `-sm`, `-lg`, or `-xl`)
- Limit number of blurred elements on screen simultaneously

### Consistency Checklist
When creating new glass morphism components:

1. Use `backdrop-blur-md` (not other blur sizes)
2. Include `rounded-lg` for consistent corner radius
3. Add `shadow-lg` for depth
4. Use `border border-white/30` for definition
5. Include `transition-all duration-300` for interactions
6. Add appropriate hover states with glow effects
7. Ensure focus states for keyboard navigation
8. Use white text (`text-white`) for readability

### Custom Shadow Syntax
Tailwind's arbitrary value syntax for custom glows:
```tsx
shadow-[0_0_<blur-radius>px_rgba(<r>,<g>,<b>,<opacity>)]
```

Examples:
- `shadow-[0_0_15px_rgba(59,130,246,0.5)]` - Blue glow, 15px blur, 50% opacity
- `shadow-[0_0_20px_rgba(34,197,94,0.6)]` - Green glow, 20px blur, 60% opacity

## Future Enhancements

Consider these patterns for future components:

### Gradient Glass
```tsx
className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md"
```

### Layered Glass
```tsx
// Outer container
className="bg-black/40 backdrop-blur-md"
// Inner content
className="bg-white/10 backdrop-blur-sm"
```

### Dynamic Opacity
```tsx
// Adjustable opacity based on map activity
className={`bg-white/${isMapMoving ? '10' : '20'} backdrop-blur-md`}
```

## Testing Considerations

When writing tests for components with glass morphism:

1. Glass morphism is purely visual - test functionality, not styles
2. Test hover/focus states behavior (event handlers), not className changes
3. For timed transitions (like success feedback), use `vi.useFakeTimers()`:
   ```tsx
   vi.useFakeTimers();
   // Trigger state change
   await act(async () => {
     vi.advanceTimersByTime(800);
   });
   // Assert final state
   vi.useRealTimers();
   ```

## References

- LocationSearchForm.tsx - Dark glass container with form inputs
- BaseLayerControl.tsx - Light glass panel with button group
- MapStatusIndicators.tsx - Solid background status messages
- Tailwind Backdrop Blur docs: https://tailwindcss.com/docs/backdrop-blur
- Tailwind Background Opacity: https://tailwindcss.com/docs/background-color#changing-the-opacity
