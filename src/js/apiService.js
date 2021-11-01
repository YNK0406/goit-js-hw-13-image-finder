// Your API key: 24081209-97b33ada7d80b690359b33fbd
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24081209-97b33ada7d80b690359b33fbd';
export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImage() {
    const res = await fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
    );
    const { hits: images } = await res.json();
    this.incrPage();
    return images;
  }
  incrPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}