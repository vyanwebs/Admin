// src/apis/ourserviceApi/types/ourservice.types.ts
import { Document, Types } from "mongoose";

export interface IOurService extends Document {
	serviceName: string;
	price: number;
	title: string;
	highlights: string[];
	extra: string;
	imageUrl: string;
	addedBy: Types.ObjectId;
	estimatedTime: number;
	category: string; 
	gender?:string;
}
