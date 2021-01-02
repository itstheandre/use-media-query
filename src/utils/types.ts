export type Query = string | string[];
export type QueryObject =
  | {
      max: boolean | string;
      width: number;
      height?: undefined;
      min?: undefined;
    }
  | {
      max: boolean | string;
      height: number;
      width?: undefined;
      min?: undefined;
    }
  | {
      min: boolean | string;
      width: number;
      height?: undefined;
      max?: undefined;
    }
  | {
      min: boolean | string;
      height: number;
      width?: undefined;
      max?: undefined;
    };
