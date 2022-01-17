export default class EnumMatchdayState {
    static get OPEN() {
        return 1;
    }
    static get WAITING_FOR_RESULTS() {
        return 2;
    }
    static get CLOSED() {
        return 3;
    }

    static valueOf(value) {
        if(value === 'OPEN'){
            return 1
        } else if(value === 'WAITING_FOR_RESULTS'){
            return 2
        } else if(value === 'CLOSED'){
            return 3
        } else {
            return null;
        }
    }
}