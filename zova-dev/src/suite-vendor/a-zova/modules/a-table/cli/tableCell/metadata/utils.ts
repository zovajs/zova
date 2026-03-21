import fse from 'fs-extra';
import path from 'node:path';

export async function generateRestIndex(modulePath: string, append: string) {
  // index
  const fileIndex = path.join(modulePath, 'rest/index.ts');
  let contentIndex = '';
  if (fse.existsSync(fileIndex)) {
    contentIndex = (await fse.readFile(fileIndex)).toString();
  }
  if (!contentIndex.includes(append)) {
    contentIndex = `${contentIndex}${append}\n`;
    await fse.outputFile(fileIndex, contentIndex);
  }
}
