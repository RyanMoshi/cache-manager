# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release of CacheManager

## [1.0.0] - 2026-03-24

### Added
- `CacheManager` class with TTL support
- LRU eviction when maxSize is reached
- `set`, `get`, `has`, `delete`, `clear` methods
- `purgeExpired()` to manually evict stale entries
- `stats()` for cache size reporting
