# Pawly Git Workflow

**Document Version:** Foundation v1.1  
**Status:** Active Git workflow reference

> **Revision v1.1 — 21 Jul 2026:** Added bundle-based commits, parallel-agent safeguards, validation gates, and explicit approval rules.

## Purpose

This document defines how Pawly changes move from implementation to review, approval, commit, and push.

## Principles

- Keep main buildable.
- Use one logical implementation bundle per commit.
- Avoid unrelated changes.
- Validate before commit.
- Do not hide generated or automated changes.
- Major product or visual changes require Steven’s approval.

## Standard Workflow

1. Confirm the approved task bundle.
2. Inspect repository and current Git status.
3. Create a focused branch or worktree when appropriate.
4. Implement the bounded scope.
5. Run validation.
6. Review against docs and live Figma.
7. Present a final report to Steven.
8. Apply required fixes.
9. Commit after approval where required.
10. Push the approved branch or commit.

## Branches and Worktrees

Parallel Codex agents must use separate branches or Git worktrees.

Parallel tracks must not modify the same:

- navigation files;
- design-token files;
- shared component contracts;
- route configuration;
- database migrations.

One agent or track must own integration.

## Commit Rules

Each commit must:

- represent one coherent milestone;
- leave the application buildable;
- contain no unrelated refactor;
- include all required documentation changes;
- avoid temporary debugging code;
- avoid exposed secrets or local environment files.

## Commit Format

```text
type(scope): short description
```

Examples:

```text
feat(shell): add Pawly bottom navigation and quick actions
feat(check-in): complete daily check-in flow
fix(moments): preserve check-in moment ordering
docs(ai): align Codex workflow with live Figma
refactor(ui): consolidate shared card variants
```

Use the repository’s established convention when it already differs.

## Before Commit

Confirm:

- `git status` contains only intended files;
- type check, lint, and relevant tests pass;
- affected Expo Web screens were reviewed;
- native validation was completed where required;
- English and Chinese layouts were checked where relevant;
- no production admin or development tools are exposed;
- no secrets, generated caches, or machine-specific files are included.

## Documentation Commits

Documentation may be committed separately when it is a complete logical update.

Do not mix large documentation rewrites with unrelated feature implementation unless the documentation is required for that feature.

## Destructive Actions

AI must not:

- force-push;
- rewrite shared history;
- delete branches with unmerged work;
- discard uncommitted user changes;
- reset or clean the repository destructively;

unless Steven explicitly instructs it and the consequences are stated first.

## Final Report Before Approval

Provide:

- branch name;
- concise outcome;
- exact changed files;
- validation commands and results;
- unresolved issues;
- recommended commit message.

## Governance

This workflow applies to all Pawly repository changes.
