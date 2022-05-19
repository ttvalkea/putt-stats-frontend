export type apiPuttResult = {
  distance: number;
  isMade: boolean;
  isUndone: boolean;
  name: string;
  puttResultId: number;
  puttTimestamp: Date;
  userId: number;
};

export type newPuttInsert = {
  distance: number;
  isMade: boolean;
  userId: number;
};
