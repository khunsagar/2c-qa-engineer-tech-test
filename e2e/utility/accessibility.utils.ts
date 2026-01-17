import { AxeBuilder } from '@axe-core/playwright';
import { Page } from '@playwright/test';

export async function runAccessibilityScan(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();

  const accesabilityViolations = results.violations.filter(
    v => v.impact === 'critical' || v.impact === 'serious'
  );

  if (accesabilityViolations.length > 0) {
    console.log('Accessibility violations Details:');
    accesabilityViolations.forEach(v => {
      console.log(`- ${v.description}`);
      console.log(`  Help: ${v.help}`);
    });
  } else {
    console.log('No critical or serious accessibility violations found.');
  }

  return { accesabilityViolations };
}
