export type DeviceControl = {
  active: boolean;
  takeOff: () => void;
  takeOn(): Promise<void>;
}