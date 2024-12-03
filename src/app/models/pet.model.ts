export interface Pet {
  uuid: string;
  nickname: string;
  gender: Gender;
  dateOfBirth: Date;
  weight: number;
  height: number;
  ownerName: string;
  speciesUuid: string;
  speciesName: string;
  breedUuid: string;
  breedName: string;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}
