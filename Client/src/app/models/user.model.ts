import { CityModel } from "../models/city.model";
export class UserModel {
  _id?: string;
  firstName: string;
  lastName: string;
  mobileNo: string;
  emailId: string;
  isVerified: boolean;
  socialSiteId: string;
  socialSiteName: string;
  city: CityModel;
}
