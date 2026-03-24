'use strict';
// In-memory cache with per-key TTL and LRU eviction

class CacheManager {
  constructor(options) {
    options = options || {};
    this.maxSize = options.maxSize || 500;
    this.defaultTtl = options.defaultTtl || 60000;
    this._store = new Map();
  }

  set(key, value, ttl) {
    if (this._store.size >= this.maxSize) this._evict();
    const expiry = Date.now() + (ttl || this.defaultTtl);
    this._store.set(key, { value, expiry, hits: 0 });
    return this;
  }

  get(key) {
    const entry = this._store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiry) { this._store.delete(key); return undefined; }
    entry.hits++;
    return entry.value;
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  delete(key) {
    return this._store.delete(key);
  }

  clear() {
    this._store.clear();
    return this;
  }

  _evict() {
    let oldest = null;
    let oldestTime = Infinity;
    this._store.forEach((v, k) => {
      if (v.expiry < oldestTime) { oldestTime = v.expiry; oldest = k; }
    });
    if (oldest) this._store.delete(oldest);
  }

  purgeExpired() {
    const now = Date.now();
    this._store.forEach((v, k) => { if (now > v.expiry) this._store.delete(k); });
    return this;
  }

  stats() {
    this.purgeExpired();
    return { size: this._store.size, maxSize: this.maxSize };
  }
}

module.exports = CacheManager;
