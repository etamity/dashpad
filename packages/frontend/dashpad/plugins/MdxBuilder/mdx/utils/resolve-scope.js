import ModuleComplier from 'common/libs/ModuleComplier';
import path from 'path';
import { Remote } from 'common/libs/Remote';

const { ContentHelper } = Remote();

const resolveModule = (
    allPossibleValues,
    modulePath,
    packageInfo,
    imports,
    possibleValue
) => {
    const { filePath } = packageInfo;
    const Exports = (ModuleComplier.requireLib(
        path.dirname(filePath), 
        allPossibleValues, 
        packageInfo
        ))(modulePath);

    possibleValue = {};

    if (imports.ImportDefault) {
        if (Exports.default) {
            possibleValue.ImportDefault = Exports.default;
        } else {
            possibleValue.ImportDefault = Exports;
        }
    }
    if (imports.Import) {
        possibleValue.Import = Exports;
    }
    return possibleValue;
};

export default (allPossibleValues, resolvedScope, resolvePath, packageInfo) => {
    const result = {};

    const addToScope = (key, value) => {
        if (result[key]) {
            throw new Error(`Scope resolve malfunction for reference - ${key}`);
        }
        result[key] = value;
    };

    Object.entries(resolvedScope).forEach(([modulePath, imports]) => {
        let possibleValue = allPossibleValues[modulePath];
        if (modulePath.charAt(0) === '.' || !possibleValue) {
            possibleValue = resolveModule(
                allPossibleValues,
                modulePath,
                packageInfo,
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
