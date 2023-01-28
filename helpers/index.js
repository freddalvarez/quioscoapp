export const formatearDinero = (cantidad) => {
    return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(cantidad);
}
