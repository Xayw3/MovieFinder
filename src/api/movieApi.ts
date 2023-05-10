const movieApi = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '433e58e14ddff9586a5b1f8d7895559f',
  originalImage: (url: string) => `https://www.themoviedb.org/t/p/original/${url}`,
  mediumImage: (url: string) => `https://www.themoviedb.org/t/p/w500/${url}`,
};

export default movieApi;
