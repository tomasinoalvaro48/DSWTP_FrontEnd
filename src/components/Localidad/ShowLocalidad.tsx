import { get } from "../../api/dataManager.ts";
import { Table } from "react-bootstrap";
import type { Localidad } from "../../entities/entities.ts";
import { Link } from "react-router";
import DeleteEntityButton from "../DeleteEntityButton.tsx";

export function ShowLocalidad(){
    const {data, loading, error} = get<Localidad>('localidad')

    return(
        <div className="ShowLocalidades">
            <h1>Localidades</h1>
            <Table striped bordered hover>
                <thead className="table-dark">
                    <tr>
                        <th>Id</th>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((unaLocalidad)=> (
                        <tr key = {unaLocalidad.id}> 
                            <th>{unaLocalidad.id}</th>
                            <th>{unaLocalidad.codigo_localidad}</th>
                            <th>{unaLocalidad.nombre_localidad}</th>
                            <th>
                                <Link
                                    to={`/update-localidad/${unaLocalidad.id}`}
                                    className="btn btn-sm btn-primary me-2"
                                >
                                Editar
                                </Link>
                                <DeleteEntityButton
                                    idToDelete={unaLocalidad.id}
                                    nameToDelete={unaLocalidad.nombre_localidad}
                                    route={'localidad'}    
                                />
                            </th>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {loading && <div>Cargando...</div>}
            {error && <div>{error}</div>}
            <Link to="/add-localidad" className="btn btn-lg btn-success m-3 mt-0">
                + Agregar Localidad
            </Link>
        </div>
    )
}