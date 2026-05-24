# CLAUDE.md — WebDesign project conventions

## Styles
- Always use **Tailwind utility classes** for styling. Never write hard-coded CSS properties directly in `.css` files.
- Exception: vendor overrides (e.g. `--ss-primary-color` on `:root`) and custom keyframe animations that Tailwind cannot express are allowed in `application.css`.
- For Stimulus-generated DOM (JS controllers), prefer inserting Tailwind class strings rather than inline `style` attributes or custom CSS classes.
