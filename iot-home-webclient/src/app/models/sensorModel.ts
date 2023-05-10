export interface SensorModel {
  id: string;
  name: string;
  producent_name: string;
  product_url: string;
  measured_phenomenom: string;
  measurement_unit_short: string;
  measured_range_top: number;
  measured_range_bottom: number;
  precision: number;
}
