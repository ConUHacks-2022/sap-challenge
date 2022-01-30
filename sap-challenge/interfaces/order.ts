export interface IOrder {
	id: number;
	sap_id: number;
	preparation_time: string;
	parcel_size: string;
	entries: string;
	schedule?: boolean;
}
