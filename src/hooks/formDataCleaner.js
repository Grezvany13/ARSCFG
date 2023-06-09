const formDataCleaner = (data, schema, group, isArray) => {
    if (data) {
        let dataArray = Object.entries(data);

        let toggleCheck = [];

        // eslint-disable-next-line
        let tmp = dataArray.toSorted((a, b) => { return (b[0].length - a[0].length) }).map(([key, value]) => {
            // remove combo toggle keys
            if (key.includes('_toggle')) {
                toggleCheck[(key.replace('_toggle', ''))] = value;
                return value;
            }
            return null;
        }).filter((value) => value !== null);

        let newDataArray = dataArray.map(([key, value]) => {
            if (key.includes('_toggle')) {
                return [];
            }

            if (typeof value === "object") {
                // custom handling for game.mods
                // array with objects
                if (key === 'mods') {
                    let temp = formDataCleaner(value, schema, key, true);
                    let newTemp = temp.map((value) => {
                        return value[1];
                    });
                    if (newTemp.length === 0) {
                        return [];
                    }
                    return [key, newTemp];
                }
                // custom handling for game.supportedPlatforms
                // flat array
                if (key === 'supportedPlatforms') {
                    let temp = formDataCleaner(value, schema, key, true);
                    let newTemp = temp.map((value, index) => {
                        return value[1];
                    });
                    if (newTemp.length === 0) {
                        return [];
                    }
                    return [key, newTemp];
                }
                let temp = [key, formDataCleaner(value, schema, key)];
                
                // remove empty arrays/objects
                if (Object.keys(temp[1]).length === 0
                || temp[1].length === 0) {
                    return [];
                }
                return temp;
            }

            if (typeof toggleCheck[key] !== "undefined") {
                if (toggleCheck[key] === false) {
                    return [];
                }
            }

            if (
                schema[group]?.required.includes(key)
                || schema.definitions[group]?.required?.includes(key)
            ) {
                return [key, value];
            }

            if (
                ((typeof value === "string" || typeof value === "number") && value !== '')
                || (typeof value === "boolean")
                || (typeof value === "object" && (
                    Object.keys(value).length === 0
                    || value.length === 0
                ))
            ) {
                if (
                    schema.properties[key]?.default === value
                    || schema[group]?.properties[key]?.default === value
                    || schema.definitions[group]?.properties[key]?.default === value
                ) {
                    return [];
                }
                if (
                    toggleCheck[key] === true
                    && value === 0 // not sure how to handle other "defaults"
                ) {
                    return [key, true];
                }
                return [key, value];
            }
            return [];
        }).filter(([key, value]) => value !== undefined);

        if (isArray) {
            return newDataArray;
        }
        return Object.fromEntries(newDataArray);
    }
    return {};
};

export default formDataCleaner;