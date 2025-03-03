export interface IOption {
  _id: string;
  accountName: string;
  calculationMethod: string;
  createdAt: string;
  status: string;
  updatedAt: string;
  user: string;
  uuid: string;
}

export interface IoData {
  id: string;
  name: string;
  value: string;
}

export interface DropdownProps {
  options: IOption[];
  placeholder: string;
  onSelect: (option: IOption) => void;
}

export interface SelectProps {
  data: IoData[];
  placeholder: string;
  onSelect: (option: IoData) => void;
}
