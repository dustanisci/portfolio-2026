import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useGsapReveal } from '../hooks/useGsapReveal';

// Mock gsap and ScrollTrigger
vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    context: vi.fn().mockImplementation((fn: () => void, _container: unknown) => {
      fn();
      return { revert: vi.fn() };
    }),
    fromTo: vi.fn(),
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}));

describe('useGsapReveal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns a ref object', () => {
    const { result } = renderHook(() => useGsapReveal());
    expect(result.current).toBeDefined();
    expect(result.current).toHaveProperty('current');
  });

  it('works with custom selector', () => {
    const { result } = renderHook(() => useGsapReveal('.my-item'));
    expect(result.current).toBeDefined();
  });

  it('works with custom options', () => {
    const { result } = renderHook(() =>
      useGsapReveal('.my-item', {
        from: { opacity: 0, x: -20 },
        to: { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        stagger: 0.2,
      })
    );
    expect(result.current).toBeDefined();
  });

  it('reverts context on unmount', async () => {
    const revert = vi.fn();
    const { gsap } = await import('gsap');
    (gsap.context as ReturnType<typeof vi.fn>).mockReturnValueOnce({ revert });

    const { unmount } = renderHook(() => useGsapReveal());
    unmount();
    expect(revert).toHaveBeenCalled();
  });
});
