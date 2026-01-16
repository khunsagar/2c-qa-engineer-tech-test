import { AxeBuilder } from '@axe-core/playwright';
import { Page } from '@playwright/test';

export async function runAccessibilityScan(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();

  const blockingViolations = results.violations.filter(
    v => v.impact === 'critical' || v.impact === 'serious'
  );

  if (blockingViolations.length > 0) {
    console.log('Accessibility violations Details:');
    blockingViolations.forEach(v => {
      console.log(`- ${v.description}`);
      console.log(`  Help: ${v.help}`);
    });
  } else {
    console.log('No critical or serious accessibility violations found.');
  }

  return { blockingViolations };
}
