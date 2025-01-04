enum CategoryStatus {
  'Inactive' = 0,
  'Active ' = 1,
  'Updated' = 2,
}

export interface Category {
  id: number;
  profile_id?: number;
  name: string;
  color: string;
  created_at?: Date;
  updated_at?: Date;
  status: CategoryStatus
}