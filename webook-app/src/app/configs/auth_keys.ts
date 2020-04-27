interface AuthKey {
    requireAttribution: boolean;
    authKey?: string;
    limitTime?: number;
    limitValue?: number;
    apiLink?: string;
}

const giphyAuthKey: AuthKey = {
    requireAttribution: true, // https://developers.giphy.com/docs/api/#quick-start-guide
    authKey: 'Mxy0pxliZEfScVsIbGCnxOmyeXQADvJT',
    limitTime: 3600,
    limitValue: 42,
    apiLink: 'https://developers.giphy.com/dashboard/'
};

const pexelsAuthKey: AuthKey = {
    requireAttribution: true,
    authKey: '563492ad6f91700001000001b80c334e11214071a7452649726bb382',
    limitTime: 3600,
    limitValue: 200,
    apiLink: 'https://www.pexels.com/pt-br/api/documentation/'
};

const pixabayAuthKey: AuthKey = {
    requireAttribution: true,
    authKey: '2239596-fa4f7e38cfacc503d0c4f4528',
    limitTime: 3600,
    limitValue: 5000,
    apiLink: 'https://pixabay.com/api/docs/'
};

export const authKeys = {
    giphy: giphyAuthKey,
    pexels: pexelsAuthKey,
    pixabay: pixabayAuthKey,
};
