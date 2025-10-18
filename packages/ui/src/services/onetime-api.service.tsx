// services/onetime-api.service.ts
import axios, { AxiosError } from "axios";
import { getItem, setItem } from "@workspace/ui/services/indexdb-api.service";
import { CONFIG } from "@workspace/ui/config/config";

interface CachedData<T> {
  data: T[];
  timestamp: number;
}

class CachedApiService<T> {
  private inMemoryCache: T[] | null = null;
  private fetchPromise: Promise<T[]> | null = null;
  private lastFetched: number | null = null;
  private ttlMs: number;

  constructor(
    private readonly cacheKey: string,
    private readonly url: string,
    ttlMinutes: number // 👈 accept TTL in minutes
  ) {
    this.ttlMs = ttlMinutes * 60 * 1000; // convert → ms
  }

  async getList(forceRefresh = false, payload: any = {}): Promise<T[]> {
    // ✅ Use in-memory cache if fresh
    if (
      !forceRefresh &&
      this.inMemoryCache &&
      !payload &&
      this.lastFetched &&
      Date.now() - this.lastFetched < this.ttlMs
    ) {
      return this.inMemoryCache;
    }

    // ✅ Deduplicate ongoing requests
    if (this.fetchPromise) {
      return this.fetchPromise;
    }

    this.fetchPromise = (async () => {
      try {
        // ✅ Check IndexedDB first
        if (!forceRefresh) {
          const cached: CachedData<T> | null = await getItem(this.cacheKey);
          if (cached?.data) {
            const isFresh = Date.now() - cached.timestamp < this.ttlMs;
            if (isFresh) {
              this.inMemoryCache = cached.data;
              this.lastFetched = cached.timestamp;
              return cached.data;
            }
          }
        }

        // ✅ Fetch from API
        const response = await axios.post(this.url, payload ?? {}); // change to GET if API expects GET
        const result = response.data;
        let data: T[] = [];
        data = result?.data;

        // Normalize different API response shapes
        // if (Array.isArray(result?.data)) {
        //   data = result.data;
        // } else if (Array.isArray(result?.trending)) {
        //   data = result.trending;
        // } else if (Array.isArray(result)) {
        //   data = result;
        // } else {
        //   data = result?.data;
        //   console.warn(`[${this.cacheKey}] Unexpected API shape:`, result);
        // }

        // ✅ Cache results
        this.inMemoryCache = data;
        this.lastFetched = Date.now();
        await setItem(this.cacheKey, {
          data,
          timestamp: this.lastFetched,
        });

        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const err = error as AxiosError;
          console.error(
            `[${this.cacheKey}] API error:`,
            err.response?.status,
            err.response?.data || err.message
          );
        } else {
          console.error(`[${this.cacheKey}] Unknown error:`, error);
        }
        return [];
      } finally {
        this.fetchPromise = null;
      }
    })();

    return this.fetchPromise;
  }

  async refreshList(): Promise<T[]> {
    return this.getList(true);
  }

  clearCache(): void {
    this.inMemoryCache = null;
    this.lastFetched = null;
  }
}

// ✅ Instantiate services with TTL in minutes
export const trendingListOnetime = new CachedApiService<any>(
  "trendingList",
  CONFIG.trendingList,
  CONFIG.trendingListTime //  minutes
);
export const allEventsListOnetime = new CachedApiService<any>(
  "allEventsList",
  CONFIG.allEventsList,
  CONFIG.allEventsListTime //  minutes
);

export const allSportList = new CachedApiService<any>(
  "sportList",
  CONFIG.menuList,
  CONFIG.menuListTime
);

export const bannersListOnetime = new CachedApiService<any>(
  "bannersList",
  CONFIG.bannersList,
  CONFIG.bannersListTime
);

export const racingEventListOnetime = new CachedApiService<any>(
  "racingEventsList",
  CONFIG.getRacingEvents,
  CONFIG.getRacingEventsTime
);
