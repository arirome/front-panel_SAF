import {
    MOSTRAR_PARTES_DIAS,
    MOSTRAR_PARTE_DIA_UNICO,
    ERROR_PARTE_DIA,
    LIMPIAR_PARTES_DIAS,
    AGREGAR_PARTE_DIA,
    ACTUALIZAR_PARTE_DIA,
    MOSTRAR_PARTES_DIAS_POR_FECHA,
    ERROR_PARTES_DIAS_POR_FECHA
} from "../Types/types";

const initialState = {
    partes_dias: [],
    parte_dia: null,
    loading: true,
    error: {},
    error_por_fecha: {},
    totalPartes: 0
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case MOSTRAR_PARTES_DIAS:
            return {
                ...state,
                partes_dias: payload.partesDatos,
                loading: false,
                totalPartes: payload.totalPage
            }
        case MOSTRAR_PARTE_DIA_UNICO:
            return {
                ...state,
                parte_dia: payload,
                loading: false
            }
        case MOSTRAR_PARTES_DIAS_POR_FECHA:
            return {
                ...state,
                parte_dia: payload,
                loading: false
            }
        case AGREGAR_PARTE_DIA:
            return {
                ...state,
                partes_dias: [payload, ...state.partes_dias],
                loading: false,
            };
        case LIMPIAR_PARTES_DIAS:
            return {
                partes_dias: [],
                parte_dia: null,
                loading: true,
                error: {},
                error_por_fecha: {},
                totalPartes: 0
            }
        case ERROR_PARTE_DIA:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case ERROR_PARTE_DIA:
            return {
                ...state,
                error_por_fecha: payload,
                loading: false
            }
        default:
            return state
    }

}