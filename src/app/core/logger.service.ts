import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {

    log(message: string): void {
        const timeString: String = new Date().toLocaleTimeString();
        console.info(`${timeString}, ${message}`);
    }

    error(message: string): void {
        console.error(`Error: ${message}`);
    }
}
