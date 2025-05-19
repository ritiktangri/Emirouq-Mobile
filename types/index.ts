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

export interface AudioRecorderState {
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  mediaRecorder: MediaRecorder | null;
  audioChunks: Blob[];
  audioUrl: string | null;
}

export interface WaveformPoint {
  x: number;
  y: number;
  height: number;
}
