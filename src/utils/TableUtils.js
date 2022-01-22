import S from 'string';
import { v1 as uuid } from 'uuid';

export default class TableUtils {
    static isEmpty(value) {
        if (Array.isArray(value)) {
            // eslint-disable-next-line no-restricted-syntax
            for (const item of value) {
                if (S(item).isEmpty()) {
                    return true;
                }
            }

            return false;
        }

        return S(value).isEmpty();
    }

    static generateUUID() {
        return uuid();
    }
}
