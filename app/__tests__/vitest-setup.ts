import { expect } from 'vitest';
import { toHaveNoViolations } from 'vitest-axe/dist/matchers.js';
import '@testing-library/jest-dom';

expect.extend({ toHaveNoViolations });
