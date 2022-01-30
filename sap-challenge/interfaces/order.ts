import {statusOptions} from '../components/orders'

export interface IOrder {
    sap_id: number,
    preparation_time: string,
    parcel_size: string,
    entries: string,
    schedule?: boolean,
    status: statusOptions,
}

