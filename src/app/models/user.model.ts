import { takeUntil } from 'rxjs/operators';

export class User  {

    _id: string;
    strName: string;
    strLastName: string;
    strMotherLastName:string;
    strEmail:string;
    strPassword:string;
    idRole:string;
    strDirection:string;
    strValidatePass:string; 
    blnStatus: boolean = false; 
    blnNotificaciones: boolean = true;
    arrEspecialidadPermiso?: [{
      
      
    }];
    updatedAt: Date;
    cratedAt: Date;
}