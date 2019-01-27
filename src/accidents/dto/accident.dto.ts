export class AccidentDto {
  date?: Date;
  location?: {
    position?: number[];
    address?: string;
    map?: string;
  };
}
