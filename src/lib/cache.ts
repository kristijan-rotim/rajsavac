interface CacheItem<T> {
    data: T;
    timestamp: number;
}

export class Cache<T> {
    private cache: Map<string, CacheItem<T>>;
    private readonly ttl: number;

    constructor(ttlInSeconds: number = 300) { // 5 minutes default TTL
        this.cache = new Map();
        this.ttl = ttlInSeconds * 1000;
    }

    set(key: string, value: T): void {
        this.cache.set(key, {
            data: value,
            timestamp: Date.now()
        });
    }

    get(key: string): T | null {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() - item.timestamp > this.ttl) {
            this.cache.delete(key);
            return null;
        }

        return item.data;
    }

    clear(): void {
        this.cache.clear();
    }
}