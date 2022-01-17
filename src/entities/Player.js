export default class Player {
    constructor(id, name, male, birthdate, w, l, pts) {
        this._id = id
        this._name = name
        this._male = male
        this._birthdate = birthdate
        this._w = w
        this._l = l
        this._pts = pts
    }

    getId = () => this._id

    getName = () => this._name

    isMale = () => this._male

    getBirthdate = () => this._birthdate

    getW = () => this._w

    getL = () => this._l

    getPts = () => this._pts

    getAge = () => {
        const today = new Date();
        const dateBirthdate = new Date(this.getBirthdate());
        let age = today.getFullYear() - dateBirthdate.getFullYear();
        const m = today.getMonth() - dateBirthdate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dateBirthdate.getDate())) {
            age--;
        }
        return age;
    }

}