import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../../estilos/ProductosAdmin.css';
import MenuLateral from '../../componentes/sidebar';
import NavAdmin from '../../componentes/navegacionAdmin';


const ToggleSwitch = ({ isActive, onToggle }) => (
    <div className={`toggle-switch ${isActive ? 'active' : ''}`} onClick={onToggle}>
        <div className="toggle-knob"></div>
    </div>
);

const ProductosAdmin = () => {
    const [dataProductos, setDataProductos] = useState([]);
    const [selectedProducto, setSelectedProducto] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [showVerMasModal, setShowVerMasModal] = useState(false);
    const [showEditarModal, setShowEditarModal] = useState(false);
    const [showNuevoModal, setShowNuevoModal] = useState(false); // Nuevo estado para el modal de nueva receta
    useEffect(() => {
        fetch('http://localhost:5000/semillas')
            .then(response => response.json())
            .then(data => setDataProductos(data))
            .catch(error => console.error('Error al obtener productos:', error));
    }, []);

    
    const toggleActivo = (id) => {
        setDataProductos((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, activo: !item.activo } : item
            )
        );
    };
    

    

    const handleEditar = (Producto) => {
        setSelectedProducto(Producto);
        setEditMode(true);
        setShowEditarModal(true);
    };

    const handleUpdateProducto = (e) => {
        e.preventDefault();
        const updatedProductos = dataProductos.map((Producto) =>
            Producto.id === selectedProducto.id ? selectedProducto : Producto
        );
        setDataProductos(updatedProductos);
        setShowEditarModal(false);
    };

    const handleNuevoProducto = () => {
        setShowNuevoModal(true); // Mostrar el modal para crear nuevo producto
    };

    const handleCloseNuevoModal = () => {
        setShowNuevoModal(false); // Cerrar el modal de nuevo producto
    };

    return (
        <div className="ProductosAdmin">
            <NavAdmin />
            <MenuLateral />
            <h1>Productos</h1>
            <input type="text" className="buscarProductosAdmin"/>
            <button  className="botonBuscarProductosAdmin"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            <button 
                className="nuevaRecetaAdmin" 
                onClick={handleNuevoProducto} // Abrir el modal de nuevo producto
            >
                Registrar producto
            </button>
                        <table className="crudProductosAdmin">
                <thead>
                    <tr>
                        <td className="tituloCrudProductos">Id</td>
                        <td className="tituloCrudProductos">Nombre</td>
                        <td className="tituloCrudProductos"></td>
                        <td className="tituloCrudProductos">Acciones</td>
                    </tr>
                </thead>
                <tbody>
                    {dataProductos.map((item) => (
                        <tr key={item.id} style={{ opacity: item.activo ? 1 : 0.5 }}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>{item.ingredientes}</td>
                            
                            <td className="accionesProductosAdmin">
                                <NavLink className='actulizarProductos'>
                                    <FontAwesomeIcon icon={faPencil} onClick={() => handleEditar(item)} style={{ color: "#000000" }} />
                                </NavLink>
                                <ToggleSwitch
                                    isActive={item.activo}
                                    onToggle={() => toggleActivo(item.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para "Ver más" */}
            {showVerMasModal && (
                <div className="modal-overlay" onClick={() => setShowVerMasModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setShowVerMasModal(false)}>X</button>
                        <h2>Detalles de la Producto</h2>
                        <p><strong>Nombre:</strong> {selectedProducto?.nombre}</p>
                        <p><strong>Ingredientes:</strong> {selectedProducto?.ingredientes}</p>
                        <p><strong>descripcion:</strong> {selectedProducto?.descripcion}</p>
                    </div>
                </div>
            )}

            {/* Modal para "Editar" */}
            {showEditarModal && (
                <div className="modalEditarProductosAdmin" onClick={() => setShowEditarModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setShowEditarModal(false)}>X</button>
                        <h2>Editar Producto</h2>
                        <form onSubmit={handleUpdateProducto} className="formularioEditarProductosAdmin">
                            <input className="inputProductoEditarAdmin" placeholder="Nombre" type="text" /><br />
                            <input className="inputProductoEditarAdmin" placeholder="Ingredientes" type="text" /><br />
                            <input className="inputProductoEditarAdmin" placeholder="Descripcion" type="text" /><br />
                            <input className="inputProductoEditarAdmin" placeholder="Adjuntar foto" type="text" /><FontAwesomeIcon icon={faImages} className="iconoFotoProductosAdmin"/>
                            <button type="submit" className="botonEditarProductosAdmin">Guardar Cambios</button>
                        </form>
                    </div>
                </div>
                )}

                 {/* Modal para "Nueva receta" */}
            {showNuevoModal && (
                <div className="modal-overlay" onClick={handleCloseNuevoModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={handleCloseNuevoModal}>X</button>
                        <h2>Registrar Nuevo producto</h2>
                        <form className="formularioEditarRecetasAdmin">
                           
                            <input className="inputRecetaEditarAdmin" placeholder="Adjuntar foto" type="text" /><FontAwesomeIcon icon={faImages} className="iconoFotoRecetasAdmin"/>
                            <button type="submit" className="botonEditarRecetasAdmin">Registrar Receta</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductosAdmin;
