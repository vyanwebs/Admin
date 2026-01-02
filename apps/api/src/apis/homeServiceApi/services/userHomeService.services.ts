import UserHomeService from "../models/userHomeService.model";

class UserHomeServiceService {
  static async create(data: any) {
    return await UserHomeService.create(data);
  }

  static async getUserBookings(userId: string) {
    return await UserHomeService.find({ userId })
      .populate("service");
  }
}

export default UserHomeServiceService;
