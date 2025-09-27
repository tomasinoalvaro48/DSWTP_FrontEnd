import { get } from "../../api/dataManager.ts";
import { Table } from "react-bootstrap";
import type { Zona } from "../../entities/entities.ts";
import { Link } from "react-router-dom";
import DeleteEntityButton from "../DeleteEntityButton.tsx";

export function ShowZonas(){
    const {data, loading, error} = get<Zona>('zona')

    return(
        <div className="ShowZonas">
            <h1>Zonas</h1>
            <Table striped bordered hover>
                <thead className="table-dark">
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Código Localidad</th>
                        <th>Nombre Localidad</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((unaZona)=> (
                        <tr key = {unaZona.id}> 
                            
                            <th>{unaZona.id}</th>
                            <th>{unaZona.nombre_zona}</th>
                            <th>{unaZona.localidad.codigo_localidad}</th>
                            <th>{unaZona.localidad.nombre_localidad}</th>


                            <th>
                                <Link
                                    to={`/update-zona/${unaZona.id}`}
                                    className="btn btn-sm btn-primary me-2"
                                >
                                Editar
                                </Link>
                                <DeleteEntityButton
                                    idToDelete={unaZona.id}
                                    nameToDelete={unaZona.nombre_zona}
                                    route={'zona'}    
                                />
                            </th>

                        </tr>

                    ))}
                </tbody>
            </Table>
            {loading && <div>Cargando...</div>}
            {error && <div>{error}</div>}
            <Link to="/add-zona" className="btn btn-lg btn-success m-3 mt-0">
                + Agregar Zona
            </Link>
        </div>
    )
}