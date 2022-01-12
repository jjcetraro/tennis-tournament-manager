export default class Player {
    constructor(id, name, male, birthdate) {
        this._id = id
        this._name = name
        this._male = male
        this._birthdate = birthdate
    }

    getId = () => this._id

    getName = () => this._name

    isMale = () => this._male

    getBirthdate = () => this._birthdate

    getAge = () => {
        return 0
    }
}