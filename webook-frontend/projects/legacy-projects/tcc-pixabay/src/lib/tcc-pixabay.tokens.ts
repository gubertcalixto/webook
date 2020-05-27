import { InjectionToken } from '@angular/core';

export const TCC_PIXABAY_API_KEY = new InjectionToken<string>('pixabayApiKey');

export interface PixabayHit {
    largeImageURL: string;
    webformatHeight: number;
    webformatWidth: number;
    likes: number;
    imageWidth: number;
    id: number;
    user_id: number;
    views: number;
    comments: number;
    pageURL: string;
    imageHeight: number;
    webformatURL: string;
    type: string;
    previewHeight: number;
    tags: string;
    downloads: number;
    user: string;
    favorites: number;
    imageSize: number;
    previewWidth: number;
    userImageURL: string;
    previewURL: string;
}

export interface PixabayResult {
    totalHits: number;
    hits: PixabayHit[];
    total: number;
}
