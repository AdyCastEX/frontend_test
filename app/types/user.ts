export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type Geo = {
  lat: string;
  lng: string;
};

export type SortField = "name" | "company" | "email";

export type SortDirection = "asc" | "desc";

export type FieldOption = {
  label: string;
  value: SortField;
}

export type DirectionOption = {
  label: string;
  value: SortDirection;
}