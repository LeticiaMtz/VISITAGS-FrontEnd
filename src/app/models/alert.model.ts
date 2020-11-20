import { FileModel } from './file.model';
import { ReasonsModel } from './reasons-crde.model';
import { User } from './user.model';


export class AlertModel {
    _id?: string;
    idUser: string;
    idEstatus: string;
    strMatricula: [];
    strNombreAlumno: [];
    idAsignatura: string;
    idCarrera?: string;
    strCarrera: string;
    idEspecialidad: string;
    strGrupo: string;
    idConductaRiesgo: string;
    chrTurno: string;
    idModalidad: string;
    strDescripcion: string;
    arrCrde?: any = [{
        ReasonsModel
    }];
    arrInvitados?: any [];
    aJsnEvidencias?: any = [{
        FileModel
    }];
    aJsnSeguimiento?: [{
        SeguimientoModel
    }];
    blnAvtivo?: boolean = true;
    createdAt: Date;
    createdAt1?: Date;
}
