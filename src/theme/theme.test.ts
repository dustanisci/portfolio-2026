import { describe, it, expect } from 'vitest';
import theme from '../theme/theme';

describe('theme', () => {
  it('mode is light', () => {
    expect(theme.palette.mode).toBe('light');
  });

  it('primary main color is correct', () => {
    expect(theme.palette.primary.main).toBe('#4F46E5');
  });

  it('secondary main color is correct', () => {
    expect(theme.palette.secondary.main).toBe('#7C3AED');
  });

  it('background default is set', () => {
    expect(theme.palette.background.default).toBe('#F8F7F4');
  });

  it('background paper is white', () => {
    expect(theme.palette.background.paper).toBe('#FFFFFF');
  });

  it('custom gradient palette exists', () => {
    expect(theme.palette.gradient).toBeDefined();
    expect(theme.palette.gradient.primary).toContain('#4F46E5');
    expect(theme.palette.gradient.hero).toContain('#F8F7F4');
    expect(theme.palette.gradient.card).toContain('rgba(79,70,229');
  });

  it('font family includes Inter', () => {
    expect(theme.typography.fontFamily).toContain('Inter');
  });

  it('border radius is 12', () => {
    expect(theme.shape.borderRadius).toBe(12);
  });

  it('breakpoints are customized', () => {
    expect(theme.breakpoints.values.sm).toBe(480);
    expect(theme.breakpoints.values.md).toBe(768);
    expect(theme.breakpoints.values.lg).toBe(1200);
  });
});
