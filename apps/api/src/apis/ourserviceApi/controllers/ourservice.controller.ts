// import { Request, Response } from "express";
// import OurServiceService from "../services/ourservice.service";

// // CREATE
// export const createOurService = async (req: Request, res: Response) => {
//   const customReq = req as any;

//   try {
//     const {
//       serviceName,
//       price,
//       title,
//       highlights,
//       extra,
//       estimatedTime,
//       category,
//       gender,
//     } = req.body;

//     if (!customReq.user?._id) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     if (!customReq.file) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Service image is required!" });
//     }

//     const imageUrl = `${process.env.URL}/uploads/images/${customReq.file.filename}`;

//     const newService = await OurServiceService.create({
//       serviceName,
//       price,
//       title,
//       highlights,
//       extra,
//       estimatedTime,
//       category,
//       gender,
//       imageUrl,
//       addedBy: customReq.user._id,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Service created successfully",
//       data: newService,
//     });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return res.status(500).json({ success: false, error: error.message });
//     }
//     return res
//       .status(500)
//       .json({ success: false, error: "Unknown error occurred" });
//   }
// };

// // GET ALL
// export const getAllOurServices = async (req: Request, res: Response) => {
//   const customReq = req as any;

//   try {
//     const services = await OurServiceService.getByUser(customReq.user._id);

//     return res.status(200).json({ success: true, data: services });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return res.status(500).json({ success: false, error: error.message });
//     }
//     return res
//       .status(500)
//       .json({ success: false, error: "Unknown error occurred" });
//   }
// };

// // GET BY ID
// export const getOurServiceById = async (req: Request, res: Response) => {
//   try {
//     const service = await OurServiceService.getById(req.params.id);

//     if (!service) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Service not found" });
//     }

//     return res.status(200).json({ success: true, data: service });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return res.status(500).json({ success: false, error: error.message });
//     }
//     return res
//       .status(500)
//       .json({ success: false, error: "Unknown error occurred" });
//   }
// };

// // UPDATE
// export const updateOurService = async (req: Request, res: Response) => {
//   const customReq = req as any;

//   try {
//     const data = req.body;

//     // Update image if provided
//     if (customReq.file) {
//       data.imageUrl = `${process.env.URL}/uploads/images/${customReq.file.filename}`;
//     }

//     const updatedService = await OurServiceService.updateById(
//       req.params.id,
//       data
//     );

//     if (!updatedService) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Service not found" });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Service updated successfully",
//       data: updatedService,
//     });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return res.status(500).json({ success: false, error: error.message });
//     }
//     return res
//       .status(500)
//       .json({ success: false, error: "Unknown error occurred" });
//   }
// };

// // DELETE
// export const deleteOurService = async (req: Request, res: Response) => {
//   try {
//     const deleted = await OurServiceService.deleteById(req.params.id);

//     if (!deleted) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Service not found" });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Service deleted successfully",
//     });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return res.status(500).json({ success: false, error: error.message });
//     }
//     return res
//       .status(500)
//       .json({ success: false, error: "Unknown error occurred" });
//   }
// };


import { Request, Response } from "express";
import OurServiceService from "../services/ourservice.service";

// CREATE
export const createOurService = async (req: Request, res: Response) => {
  const customReq = req as any;

  try {
    const { serviceName, price, title, highlights, extra, estimatedTime, category, gender } = req.body;

    if (!customReq.user?._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!customReq.file) {
      return res.status(400).json({ success: false, message: "Service image is required!" });
    }

    const imageUrl = `${process.env.URL}/uploads/images/${customReq.file.filename}`;

    const newService = await OurServiceService.create({
      serviceName,
      price,
      title,
      highlights,
      extra,
      estimatedTime,
      category,
      gender,
      imageUrl,
      addedBy: customReq.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: newService,
    });
  } catch (error: unknown) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

// GET ALL
export const getAllOurServices = async (req: Request, res: Response) => {
  const customReq = req as any;

  try {
    let services;

    // Admin / Superadmin → sab services
    // Normal user → sab services bhi access kar sakta hai
    services = await OurServiceService.getAll();

    return res.status(200).json({ success: true, data: services });
  } catch (error: unknown) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

// GET BY ID
export const getOurServiceById = async (req: Request, res: Response) => {
  try {
    const service = await OurServiceService.getById(req.params.id);

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    return res.status(200).json({ success: true, data: service });
  } catch (error: unknown) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

// UPDATE
export const updateOurService = async (req: Request, res: Response) => {
  const customReq = req as any;

  try {
    const data = req.body;

    if (customReq.file) {
      data.imageUrl = `${process.env.URL}/uploads/images/${customReq.file.filename}`;
    }

    const updatedService = await OurServiceService.updateById(req.params.id, data);

    if (!updatedService) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    res.status(200).json({ success: true, message: "Service updated successfully", data: updatedService });
  } catch (error: unknown) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

// DELETE
export const deleteOurService = async (req: Request, res: Response) => {
  try {
    const deleted = await OurServiceService.deleteById(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    res.status(200).json({ success: true, message: "Service deleted successfully" });
  } catch (error: unknown) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};
