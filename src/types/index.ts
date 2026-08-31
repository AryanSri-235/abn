export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: string;
  minimumOrderQuantity?: string;
  categorySummary?: string;
  specifications?: Record<string, string>;
  subServices?: string[];
  available: boolean;
}

export interface PhotoItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  company: string;
  rating: number;
  comment: string;
  date: string;
  location?: string;
  productName?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  notes?: string;
  productTitle: string;
  productCategory: string;
  productImage?: string;
  date: string;
}

export interface CompanyInfo {
  name: string;
  logo?: string;
  tagline: string;
  city: string;
  state: string;
  address: string;
  rating: number;
  reviewCount: number;
  yearsInBusiness: number;
  gstVerified: boolean;
  gstNumber: string;
  gstRegistrationDate: string;
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  whatsapp: string;
  natureOfBusiness: string;
  legalStatus: string;
  employeeCount: string;
  heroBackground: string;
  clientele: string[];
}

export interface AboutInfo {
  description: string;
  fullDescription?: string;
  establishedYear: number;
  ceoName: string;
  annualTurnover: string;
  mission: string;
  companyImages?: string[];
  additionalBusiness?: string[];
}

export interface HsnCodeItem {
  id: string;
  code: string;
  description: string;
}

export interface AppData {
  company: CompanyInfo;
  about: AboutInfo;
  products: Product[];
  photos: PhotoItem[];
  testimonials: Testimonial[];
  hsnCodes: HsnCodeItem[];
  inquiries?: Inquiry[];
}
