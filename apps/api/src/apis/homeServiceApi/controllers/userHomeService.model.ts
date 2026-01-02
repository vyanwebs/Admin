import { Request, Response } from "express";
import UserHomeServiceService from "../services/userHomeService.services";

export const createUserHomeService = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;

    const { amount, service, phoneNumber } = req.body;

    if (
      !amount ||
      !phoneNumber ||
      !Array.isArray(service) ||
      service.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "amount, phoneNumber and service array are required",
      });
    }

    const booking = await UserHomeServiceService.create({
      userId,
      service,
      amount,
      phoneNumber,
    });

    res.status(201).json({
      success: true,
      message: "Service booked successfully",
      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
