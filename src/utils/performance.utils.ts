/**
 * Performance optimization utilities for AV-Inputs components
 * Provides common utilities for memory management, error handling, and performance monitoring
 */

/**
 * Debounce function to limit rapid successive calls
 * Useful for scan events and user interactions
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit function execution frequency
 * Useful for camera frame processing and detection loops
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Safe cleanup utility for event listeners and resources
 */
export class ResourceManager {
  private resources: Map<string, () => void> = new Map();
  private isDestroyed: boolean = false;

  add(key: string, cleanup: () => void): void {
    if (this.isDestroyed) return;

    // Clean existing resource with same key
    this.remove(key);
    this.resources.set(key, cleanup);
  }

  remove(key: string): void {
    const cleanup = this.resources.get(key);
    if (cleanup) {
      try {
        cleanup();
      } catch (error) {
        console.warn(`Error cleaning up resource ${key}:`, error);
      }
      this.resources.delete(key);
    }
  }

  cleanup(): void {
    this.isDestroyed = true;
    for (const [key, cleanup] of this.resources) {
      try {
        cleanup();
      } catch (error) {
        console.warn(`Error cleaning up resource ${key}:`, error);
      }
    }
    this.resources.clear();
  }
}

/**
 * Performance monitor for tracking component performance
 */
export class PerformanceMonitor {
  private marks: Map<string, number> = new Map();
  private metrics: Map<string, number[]> = new Map();

  start(label: string): void {
    this.marks.set(label, performance.now());
  }

  end(label: string): number {
    const startTime = this.marks.get(label);
    if (!startTime) {
      console.warn(`No start mark found for ${label}`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.marks.delete(label);

    // Store metric for analysis
    if (!this.metrics.has(label)) {
      this.metrics.set(label, []);
    }
    this.metrics.get(label)!.push(duration);

    return duration;
  }

  getMetrics(label: string): { avg: number; min: number; max: number; count: number } | null {
    const measurements = this.metrics.get(label);
    if (!measurements || measurements.length === 0) {
      return null;
    }

    return {
      avg: measurements.reduce((a, b) => a + b, 0) / measurements.length,
      min: Math.min(...measurements),
      max: Math.max(...measurements),
      count: measurements.length
    };
  }

  reset(): void {
    this.marks.clear();
    this.metrics.clear();
  }
}

/**
 * Error handler with automatic retry capabilities
 */
export class ErrorHandler {
  private retryAttempts: Map<string, number> = new Map();
  private maxRetries: number;

  constructor(maxRetries: number = 3) {
    this.maxRetries = maxRetries;
  }

  async withRetry<T>(
    operation: () => Promise<T>,
    operationId: string,
    onError?: (error: Error, attempt: number) => void
  ): Promise<T> {
    const currentAttempt = this.retryAttempts.get(operationId) || 0;

    try {
      const result = await operation();
      // Reset on success
      this.retryAttempts.delete(operationId);
      return result;
    } catch (error) {
      if (onError) {
        onError(error as Error, currentAttempt + 1);
      }

      if (currentAttempt < this.maxRetries) {
        this.retryAttempts.set(operationId, currentAttempt + 1);
        // Exponential backoff
        const delay = Math.pow(2, currentAttempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.withRetry(operation, operationId, onError);
      } else {
        this.retryAttempts.delete(operationId);
        throw error;
      }
    }
  }

  reset(operationId?: string): void {
    if (operationId) {
      this.retryAttempts.delete(operationId);
    } else {
      this.retryAttempts.clear();
    }
  }
}

/**
 * Memory usage monitor
 */
export class MemoryMonitor {
  private static instance: MemoryMonitor;
  private checkInterval: NodeJS.Timeout | null = null;
  private thresholdMB: number = 100; // Warning threshold in MB

  static getInstance(): MemoryMonitor {
    if (!MemoryMonitor.instance) {
      MemoryMonitor.instance = new MemoryMonitor();
    }
    return MemoryMonitor.instance;
  }

  startMonitoring(intervalMs: number = 30000): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    this.checkInterval = setInterval(() => {
      this.checkMemoryUsage();
    }, intervalMs);
  }

  stopMonitoring(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  private checkMemoryUsage(): void {
    if (typeof (performance as any).memory !== 'undefined') {
      const memory = (performance as any).memory;
      const usedMB = memory.usedJSHeapSize / (1024 * 1024);

      if (usedMB > this.thresholdMB) {
        console.warn(`High memory usage detected: ${usedMB.toFixed(2)}MB`);

        // Suggest garbage collection if available
        if (typeof (window as any).gc === 'function') {
          (window as any).gc();
        }
      }
    }
  }

  getMemoryInfo(): any {
    if (typeof (performance as any).memory !== 'undefined') {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        usedMB: memory.usedJSHeapSize / (1024 * 1024),
        totalMB: memory.totalJSHeapSize / (1024 * 1024)
      };
    }
    return null;
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();
