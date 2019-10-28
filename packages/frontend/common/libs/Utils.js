export const keyPathUtil = (keyPath) => {
    const api = {
        value: keyPath,
        sibling: () => keyPathUtil(keyPath.substring(
            0,
            keyPath.lastIndexOf('.')
        )),
        parent: () => {
            let parentKeyPath = keyPath.substring(
                0,
                keyPath.lastIndexOf('.')
            )
            parentKeyPath = parentKeyPath.substring(
                0,
                parentKeyPath.lastIndexOf('.')
            );
            return keyPathUtil(parentKeyPath);
        },
        append: (key) => keyPathUtil(`${keyPath}.${key}`),
        prepend: (key) => keyPathUtil(`${key}.${keyPath}`),
    }

    return api;
}