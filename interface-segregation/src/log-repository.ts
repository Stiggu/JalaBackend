import Log from './log';
import IWrite from "./IWrite";

export default class LogRepository implements IWrite<Log>{
    insert(entity: Log): Log {
        console.log('insert ok');
        return new Log();
    }

    update(id: number, entity: Log): Log {
        console.log('update ok');
        return new Log();
    }

}