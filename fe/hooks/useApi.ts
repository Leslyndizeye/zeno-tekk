import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  isActive: boolean;
  order: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  url?: string;
  isActive: boolean;
  order: number;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio?: string;
  image: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  isActive: boolean;
  order: number;
}

export interface Testimonial {
  id: number;
  clientName: string;
  clientCompany: string;
  content: string;
  clientImage?: string;
  rating: number;
  isActive: boolean;
  order: number;
}

export interface Stat {
  id: number;
  label: string;
  value: string;
  description?: string;
  isActive: boolean;
  order: number;
}

export interface HeroContent {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  ctaButton1Text: string;
  ctaButton1Url: string;
  ctaButton2Text: string;
  ctaButton2Url: string;
  badge: string;
}

// Services
export const useServices = () => {
  const { data, error, isLoading, mutate } = useSWR<{ success: boolean; data: Service[] }>(
    `${API_URL}/content/services`,
    fetcher
  );
  return {
    services: data?.data || [],
    isLoading,
    error,
    mutate,
  };
};

// Products
export const useProducts = () => {
  const { data, error, isLoading, mutate } = useSWR<{ success: boolean; data: Product[] }>(
    `${API_URL}/content/products`,
    fetcher
  );
  return {
    products: data?.data || [],
    isLoading,
    error,
    mutate,
  };
};

// Team Members
export const useTeamMembers = () => {
  const { data, error, isLoading, mutate } = useSWR<{ success: boolean; data: TeamMember[] }>(
    `${API_URL}/content/team`,
    fetcher
  );
  return {
    teamMembers: data?.data || [],
    isLoading,
    error,
    mutate,
  };
};

// Testimonials
export const useTestimonials = () => {
  const { data, error, isLoading, mutate } = useSWR<{ success: boolean; data: Testimonial[] }>(
    `${API_URL}/content/testimonials`,
    fetcher
  );
  return {
    testimonials: data?.data || [],
    isLoading,
    error,
    mutate,
  };
};

// Stats
export const useStats = () => {
  const { data, error, isLoading, mutate } = useSWR<{ success: boolean; data: Stat[] }>(
    `${API_URL}/content/stats`,
    fetcher
  );
  return {
    stats: data?.data || [],
    isLoading,
    error,
    mutate,
  };
};

// Hero Content
export const useHeroContent = () => {
  const { data, error, isLoading, mutate } = useSWR<{ success: boolean; data: HeroContent }>(
    `${API_URL}/content/hero-content`,
    fetcher
  );
  return {
    heroContent: data?.data,
    isLoading,
    error,
    mutate,
  };
};
