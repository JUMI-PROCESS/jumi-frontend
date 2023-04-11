export const deserialize = function (objData: object, clazz: object): void {
    const keys: string[] = Object.keys(clazz);

    for (const key of keys) {
        if (objData.hasOwnProperty(key)) {
            type FormKey = keyof typeof clazz;
            type ObjectKey = keyof typeof objData;
            const key_ = key as FormKey;
            const keyObject = key as ObjectKey;
            clazz[key_] = objData[keyObject];
        }
    }
};
