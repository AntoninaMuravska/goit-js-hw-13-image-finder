const KEY = `19817387-6793f3100509fa593759a5ec0`;
const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal`;

export default class ApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
    this.perPage = 12;
  }
  async fetchImg() {
    const response = await fetch(
      `${BASE_URL}&q=${this.query}&page=${this.page}&per_page=${this.perPage}&key=${KEY}`,
    );

    const data = await response.json();

    this.incrementPage();

    return data.hits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(value) {
    this.searchQuery = value;
  }
}
