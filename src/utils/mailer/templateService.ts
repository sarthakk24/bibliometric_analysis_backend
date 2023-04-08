import { template } from 'dot';
import Logger from '../../loaders/logger';

export const getTemplatedString = (data: any, file: string): string => {
    try {
        let templateVariable = template(file);
        return templateVariable(data);
    } catch (err) {
        Logger.error(err || 'Error in getting template string');
        throw err;
    }
};
