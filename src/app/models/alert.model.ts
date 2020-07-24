import { FileModel } from './file.model';

export class AlertModel {
    _id: string;
    idPersona: string;
    idEstatus: string;
    strMatricula: string;
    strNombreAlumno: string;
    idAsignatura: string;
    idCarrera: string;
    idEspecialidad: string;
    strGrupo: string;
    idConductaRiesgo: string;
    chrTurno: string;
    idModalidad: string;
    strDescripcion: string;
    arrCrde: [{
        idCrde: string;
    }];
    aJsnEvidencias: any = [{
        FileModel
    }];
    aJsnSeguimiento: [{
        SeguimientoModel
    }];
    blnAvtivo: boolean = true;
}
