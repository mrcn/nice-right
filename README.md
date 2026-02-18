# Nice Right

A Next.js 14 website with GSAP animations and static export.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Run formatter
npm run format

# Run tests
npm test
```

## Project Structure

```
├── app/              # Next.js app directory
├── components/       # React components
├── docs/             # Documentation and marketing content
├── lib/              # Utility functions
├── public/           # Static assets
├── styles/           # Global styles
├── dist/             # Build output (generated)
└── .claude/          # Claude Code configuration
    ├── commands/     # SPARC commands
    ├── helpers/      # Helper scripts
    └── skills/       # Claude Code skills
```

## Tech Stack

- **Framework**: Next.js 14.1.0
- **Language**: TypeScript (strict mode)
- **Styling**: CSS Modules
- **Animation**: GSAP 3.14.2
- **Testing**: Vitest + Playwright
- **Export**: Static site export to `dist/`

## Environment Setup

This project uses Node.js 20. No environment variables are currently required.

## Development

The project uses static export (`output: 'export'`) and outputs to the `dist/` directory.

## License

Private
