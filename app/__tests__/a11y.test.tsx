import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Footer } from '../_home/components/Footer';
import { Nav } from '../_home/components/Nav';

// Mock GSAP modules used by Nav
vi.mock('@/app/_shared/gsap-init', () => ({
  initGSAP: vi.fn(),
  gsap: {
    context: vi.fn(() => ({ revert: vi.fn() })),
  },
  ScrollTrigger: {
    create: vi.fn(),
    config: vi.fn(),
  },
}));

vi.mock('@/app/lib/analytics', () => ({
  trackCTAClick: vi.fn(),
  trackNavClick: vi.fn(),
  trackPricingView: vi.fn(),
  trackSectionView: vi.fn(),
  trackElementHover: vi.fn(),
}));

describe('Accessibility — axe automated tests', () => {
  it('Footer has no a11y violations', async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Nav has no a11y violations in closed state', async () => {
    const { container } = render(<Nav defaultSolid={true} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
