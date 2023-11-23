export function parseHeader(tree) {
    if(tree === undefined || tree?.children === undefined) {
        return {};
    }

    const header = tree.children.filter(v => v.type === 'yaml')[0].value;

    const content = header.split('\n').map(v => {
        const elems = v.split(':');

        if(elems.length < 2) {
            return {};
        }

        const key = elems[0].trim();
        const value = elems.slice(1).join(':').trim();

        return { [key]: value };
    });

    let result = {};
    content.forEach(v => {
        result = {
            ...result,
            ...v
        };
    });

    return result;
}