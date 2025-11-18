// src/apis/ourserviceApi/dtos/ourservice.dto.ts
//dtos
export interface CreateOurServiceDto {
	serviceName: string;
	price: number;
	title: string;
	highlights: string[];
	extra: { name: string; price: number }[];
	imageUrl: string;
	estimatedTime: number;
}
