export class User {
    constructor (_id = '', strName = '', strLastName = '', strMotherLastName = '',strEmail = '', strPassword = '', strRole = '', strDirection=''){
        this._id = _id;
        this.strName = strName;
        this.strLastName = strLastName;
        this.strMotherLastName = strMotherLastName
        this.strEmail = strEmail;
        this.strPassword = strPassword;
        this.strRole = strRole;
        this.strDirection = strDirection;
    }
    _id: string;
    strName: string;
    strLastName: string;
    strMotherLastName:string;
    strEmail:string;
    strPassword:string;
    strRole:string;
    strDirection:string;

}
