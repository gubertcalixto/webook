import { InjectionToken } from '@angular/core';

export const TCC_GIPHY_API_KEY = new InjectionToken<string>('giphyApiKey');

export interface GiphyDownsizedLarge {
    height: string;
    size: string;
    url: string;
    width: string;
}

export interface GiphyFixedHeightSmallStill {
    height: string;
    size: string;
    url: string;
    width: string;
}

export interface GiphyOriginal {
    frames: string;
    hash: string;
    height: string;
    mp4: string;
    mp4_size: string;
    size: string;
    url: string;
    webp: string;
    webp_size: string;
    width: string;
}

export interface GiphyFixedHeightDownsampled {
    height: string;
    size: string;
    url: string;
    webp: string;
    webp_size: string;
    width: string;
}

export interface GiphyDownsizedStill {
    height: string;
    size: string;
    url: string;
    width: string;
}

export interface GiphyFixedHeightStill {
    height: string;
    size: string;
    url: string;
    width: string;
}

export interface GiphyDownsizedMedium {
    height: string;
    size: string;
    url: string;
    width: string;
}

export interface GiphyDownsized {
    height: string;
    size: string;
    url: string;
    width: string;
}

export interface GiphyPreviewWebp {
    height: string;
    size: string;
    url: string;
    width: string;
}

export interface GiphyOriginalMp4 {
    height: string;
    mp4: string;
    mp4_size: string;
    width: string;
}

export interface GiphyFixedHeightSmall {
    height: string;
    mp4: string;
    mp4_size: string;
    size: string;
    url: string;
    webp: string;
    webp_size: string;
    width: string;
}

export interface GiphyFixedHeight {
    height: string;
    mp4: string;
    mp4_size: string;
    size: string;
    url: string;
    webp: string;
    webp_size: string;
    width: string;
}

export interface GiphyDownsizedSmall {
    height: string;
    mp4: string;
    mp4_size: string;
    width: string;
}

export interface GiphyPreview {
    height: string;
    mp4: string;
    mp4_size: string;
    width: string;
}

export interface GiphyFixedWidthDownsampled {
    height: string;
    size: string;
    url: string;
    webp: string;
    webp_size: string;
    width: string;
}

export interface GiphyFixedWidthSmallStill {
    height: string;
    size: string;
    url: string;
    width: string;
}

export interface GiphyFixedWidthSmall {
    height: string;
    mp4: string;
    mp4_size: string;
    size: string;
    url: string;
    webp: string;
    webp_size: string;
    width: string;
}

export interface GiphyOriginalStill {
    height: string;
    size: string;
    url: string;
    width: string;
}

export interface GiphyFixedWidthStill {
    height: string;
    size: string;
    url: string;
    width: string;
}

export interface GiphyLooping {
    mp4: string;
    mp4_size: string;
}

export interface GiphyFixedWidth {
    height: string;
    mp4: string;
    mp4_size: string;
    size: string;
    url: string;
    webp: string;
    webp_size: string;
    width: string;
}

export interface GiphyPreviewGif {
    height: string;
    size: string;
    url: string;
    width: string;
}

export interface GiphyFourEightZeroWStill {
    url: string;
    width: string;
    height: string;
}

export interface GiphyHd {
    height: string;
    mp4: string;
    mp4_size: string;
    width: string;
}

export interface GiphyImages {
    downsized_large: GiphyDownsizedLarge;
    fixed_height_small_still: GiphyFixedHeightSmallStill;
    original: GiphyOriginal;
    fixed_height_downsampled: GiphyFixedHeightDownsampled;
    downsized_still: GiphyDownsizedStill;
    fixed_height_still: GiphyFixedHeightStill;
    downsized_medium: GiphyDownsizedMedium;
    downsized: GiphyDownsized;
    preview_webp: GiphyPreviewWebp;
    original_mp4: GiphyOriginalMp4;
    fixed_height_small: GiphyFixedHeightSmall;
    fixed_height: GiphyFixedHeight;
    downsized_small: GiphyDownsizedSmall;
    preview: GiphyPreview;
    fixed_width_downsampled: GiphyFixedWidthDownsampled;
    fixed_width_small_still: GiphyFixedWidthSmallStill;
    fixed_width_small: GiphyFixedWidthSmall;
    original_still: GiphyOriginalStill;
    fixed_width_still: GiphyFixedWidthStill;
    looping: GiphyLooping;
    fixed_width: GiphyFixedWidth;
    preview_gif: GiphyPreviewGif;
    '480w_still': GiphyFourEightZeroWStill;
    hd: GiphyHd;
}

export interface GiphyOnload {
    url: string;
}

export interface GiphyOnclick {
    url: string;
}

export interface GiphyOnsent {
    url: string;
}

export interface GiphyAnalytics {
    onload: GiphyOnload;
    onclick: GiphyOnclick;
    onsent: GiphyOnsent;
}

export interface GiphyUser {
    avatar_url: string;
    banner_image: string;
    banner_url: string;
    profile_url: string;
    username: string;
    display_name: string;
    is_verified: boolean;
}

export interface GiphyItem {
    type: string;
    id: string;
    url: string;
    slug: string;
    bitly_gif_url: string;
    bitly_url: string;
    embed_url: string;
    username: string;
    source: string;
    title: string;
    rating: string;
    content_url: string;
    source_tld: string;
    source_post_url: string;
    is_sticker: number;
    import_datetime: string;
    trending_datetime: string;
    images: GiphyImages;
    analytics: GiphyAnalytics;
    user: GiphyUser;
}

export interface GiphyPagination {
    total_count: number;
    count: number;
    offset: number;
}

export interface GiphyMeta {
    status: number;
    msg: string;
    response_id: string;
}

export interface GiphyItemListResult {
    data: GiphyItem[];
    pagination: GiphyPagination;
    meta: GiphyMeta;
}

export interface GiphyItemResult {
    data: GiphyItem[];
    meta: GiphyMeta;
}
