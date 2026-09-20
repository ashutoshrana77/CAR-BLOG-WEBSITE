export interface CarItem {
  id: string;
  rank: number;
  name: string;
  manufacturer: string;
  image: string;
  approxSales: string;
  price: string;
  averageLife: string;
  paragraphs: string[];
  tagline?: string;
  bodyType?: string;
}
