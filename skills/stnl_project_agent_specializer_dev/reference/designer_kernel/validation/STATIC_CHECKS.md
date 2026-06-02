# Designer Static Checks

Status: `DRAFT_INITIAL_DESIGNER_KERNEL`.

The static harness is section-aware. It checks required files, snapshot parity,
bundle allowlist, section-specific documentary evidence, safe polarity for
dangerous terms, and draft status boundaries.

## Checks

- `DSG-CH-001`: required source, snapshot, docs, and harnesses exist;
- `DSG-CH-002`: snapshot matches the productive/base source byte-for-byte;
- `DSG-CH-003`: designer kernel contains exactly the allowlisted files;
- `DSG-CH-004`: every documentary file keeps draft status and avoids final
  promotion claims;
- `DSG-CH-005`: contract identity preserves `designer`, `2026.5.1`,
  `design-contributor`, and `targeted-local`;
- `DSG-CH-006`: entry and gates preserve optional per round and real UX impact;
- `DSG-CH-007`: status contract preserves difficult `READY` and honest
  `BLOCKED`;
- `DSG-CH-008`: responsibility boundaries prohibit planner, validation pack,
  execution package, implementation, validation running, finalization, resync,
  durable docs, and materialization drift;
- `DSG-CH-009`: reading contract remains targeted-local;
- `DSG-CH-010`: golden documentation declares positive and negative scenarios;
- `DSG-CH-011`: golden harness includes fixture classification for negative
  drift.

Passing these checks does not promote the kernel.
