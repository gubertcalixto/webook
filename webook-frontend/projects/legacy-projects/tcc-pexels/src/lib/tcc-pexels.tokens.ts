import { InjectionToken } from '@angular/core';

export const TCC_PEXELS_API_KEY = new InjectionToken<string>('pexelsApiKey');

export interface PexelsSrc {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
}

export interface PexelsPhoto {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    src: PexelsSrc;
    liked: boolean;
}

export interface PexelsResult {
    total_results: number;
    page: number;
    per_page: number;
    photos: PexelsPhoto[];
    next_page: string;
}

