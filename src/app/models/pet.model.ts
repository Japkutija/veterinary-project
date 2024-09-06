export interface Pet {
  uuid: string;
  chipNumber: string;
  firstName: string;
  lastName: String;
  gender: Gender;
  dateOfBirth: Date;
  weight: number;
  height: number;
  ownerUuid: string;
  speciesUuid: string;
  speciesName: string;
  breedUuid: string;
  breedName: string;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}
