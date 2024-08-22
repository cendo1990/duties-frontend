export interface DataType {
  id?: number
}

export interface StateParams {
  data: FieldData[];
  id: number;
  loading: boolean;
}

export interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

export interface CustomizedFormProps {
  onChange: (fields: FieldData[]) => void;
  fields: FieldData[];
}