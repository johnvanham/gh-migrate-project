# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `gh-migrate-project`, a GitHub CLI extension for migrating GitHub Projects between GitHub accounts and products (GitHub.com, GitHub Enterprise Server, GitHub Enterprise Cloud with data residency). The tool is split into two main commands: `export` (extracts project data) and `import` (recreates project in target environment).

## Development Commands

### Core Development
- `npm run dev` - Run the CLI tool directly during development using tsx
- `npm run lint` - Run ESLint to check code style and catch issues
- `npm run lint-and-fix` - Run ESLint with automatic fixes
- `npm run package` - Build the distributable binaries for multiple platforms

### Utility Scripts
- `npm run clean-up-organization-projects` - Run cleanup script for organization projects
- `npm run configure-github-enterprise-server-instance` - Configure GHES instance

### Testing
No automated test suite is present in this codebase. Testing is done manually using the CLI commands.

## Architecture

### Entry Point
- `src/index.ts` - Main CLI entry point using Commander.js, registers export and import commands

### Core Commands
- `src/commands/export.ts` - Handles project export functionality, outputs `project.json`, `repository-mappings.csv`, and optionally `assignee-mappings.csv`
- `src/commands/import.ts` - Handles project import functionality, reads export files and creates project in target

### Core Modules
- `src/octokit.ts` - GitHub API client configuration with proxy and SSL support
- `src/logger.ts` - Winston-based logging with verbose mode support
- `src/projects.ts` - Project-related GraphQL operations and utilities
- `src/project-items.ts` - Project item processing and validation logic
- `src/github-products.ts` - GitHub product detection and version compatibility
- `src/graphql-types.ts` - TypeScript types for GraphQL responses
- `src/utils.ts` - Common utilities including token validation and rate limit handling
- `src/posthog.ts` - Anonymous telemetry configuration (can be disabled)

### Build System
- Uses esbuild for bundling via `build.js`
- TypeScript compilation with strict settings
- ESLint with TypeScript and Prettier integration
- Binary packaging with `@yao-pkg/pkg` for cross-platform distribution

## Key Implementation Details

### GitHub API Integration
- Uses Octokit with GraphQL pagination plugin
- Supports GitHub.com, GitHub Enterprise Server (v3.14+), and GitHub Enterprise Cloud with data residency
- Token-based authentication with scope validation (`read:project`, `repo`, `project`, `write:org`)
- Rate limit handling and SSL certificate verification options

### Data Migration Flow
1. Export extracts project metadata, items, and generates mapping templates
2. User manually completes repository and assignee mappings in CSV files
3. Import reads mappings and recreates project structure in target environment
4. Special handling for Status field migration on older GHES versions
5. Full support for iteration field migration including field creation and item values

### Error Handling
- Comprehensive validation of GitHub product versions and API compatibility
- Token scope verification before operations
- Rate limit monitoring and reporting
- Proxy and SSL configuration support for enterprise environments

## Development Notes

- All code uses ES modules (`"type": "module"` in package.json)
- TypeScript with strict type checking enabled
- Uses Winston for structured logging with optional verbose output
- Anonymous telemetry via PostHog (can be disabled with `--disable-telemetry`)
- Update checking functionality (can be disabled with `--skip-update-check`)