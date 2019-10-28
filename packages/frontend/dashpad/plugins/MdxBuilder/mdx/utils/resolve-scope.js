import ModuleComplier from 'common/libs/ModuleComplier';
import path from 'path';
import { Remote } from 'common/libs/Remote';

const { ContentHelper } = Remote();

const resolveModule = (
    allPossibleValues,
    modulePath,
    imports,
    possibleValue,
) => {
    const jsx = ContentHelper.loadFile(modulePath);
    const Exports = ModuleComplier.compile(jsx, allPossibleValues, { modulePath });
    possibleValue = {};

    if (imports.ImportDefault) {
        possibleValue.ImportDefault = Exports.default;
    }
    if (imports.Import) {
        possibleValue.Import = Exports;
    }
    return possibleValue;
};

export default (allPossibleValues, resolvedScope, resolvePath) => {
    const result = {};

    const addToScope = (key, value) => {
        if (result[key]) {
            throw new Error(`Scope resolve malfunction for reference - ${key}`);
        }
        result[key] = value;
    };

    Object.entries(resolvedScope).forEach(([modulePath, imports]) => {
        let possibleValue = allPossibleValues[modulePath];
        if (modulePath.charAt(0) === '.' && !possibleValue) {
            const filePath = path.resolve(resolvePath, modulePath);
            possibleValue = resolveModule(
                allPossibleValues,
                filePath,
                imports,
                possibleValue
            );
        }

        if (possibleValue) {
            // ImportDefault
            if (possibleValue.ImportDefault && imports.ImportDefault) {
                addToScope(imports.ImportDefault, possibleValue.ImportDefault);
            }

            if (possibleValue.Import) {
                // ImportNamespace
                if (imports.ImportNamespace) {
                    addToScope(imports.ImportNamespace, possibleValue.Import);
                }

                // Import
                if (imports.Import) {
                    Object.entries(imports.Import).forEach(
                        ([imported, importedAs]) => {
                            if (possibleValue.Import[imported]) {
                                addToScope(
                                    importedAs,
                                    possibleValue.Import[imported]
                                );
                            }
                        }
                    );
                }
            }
        }
    });

    return result;
};
