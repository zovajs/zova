import fse from 'fs-extra';
import path from 'node:path';
import { generateFileComponent } from './generateFileComponent.js';
import { generateFilePage } from './generateFilePage.js';
export async function generateFile(options, globFile, controllerInfo) {
    const cli = options.cli;
    const fileDest = path.join(options.modulePath, `src/.metadata/${controllerInfo.type}/${controllerInfo.name}.ts`);
    const content = controllerInfo.type === 'page'
        ? await generateFilePage(options, globFile, controllerInfo)
        : await generateFileComponent(options, globFile, controllerInfo);
    await fse.outputFile(fileDest, content);
    await cli.helper.formatFile({ fileName: fileDest });
}
