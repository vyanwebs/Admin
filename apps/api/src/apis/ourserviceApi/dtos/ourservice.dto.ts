export interface CreateOurServiceDto {
	serviceName: string;
	price: number;
	title: string;
	highlights: string[];
	extra: string;
	imageUrl?: string;
	estimatedTime: number;
	category: string;
	gender?: string;
}
