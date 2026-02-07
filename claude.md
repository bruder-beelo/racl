# Claude Code Instructions

## UI/UX Guidelines

### No Emojis in Production UI
- **DO NOT** use emojis in any user-facing UI components
- Emojis make the interface look unprofessional
- Use icons, symbols, or text alternatives instead

### Examples:
❌ **Don't:**
```typescript
<Text>🔍</Text>
<Text>🏆 All-Star Host</Text>
<Text>✓ Feature</Text>
```

✅ **Do:**
```typescript
<Text>Search</Text>
<Text>All-Star Host</Text>
<Text>• Feature</Text>
```

## Design Principles
- Maintain a clean, professional appearance
- Use proper iconography when needed
- Keep the UI consistent with modern design standards
- Follow Turo-inspired dark theme aesthetic
