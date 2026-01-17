
export class RandomDataGenerator {

  static randomString(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

 
  static randomTitle(): string {
    return this.randomString();
  }

  
  static randomAuthor(length: number = 10): string {
    return this.randomString(length);
  }

  
  static randomISBN(): string {
    return `978-${this.randomNumber(0, 9)}-${this.randomNumber(100, 999)}-${this.randomNumber(10000, 99999)}-${this.randomNumber(0, 9)}`;
  }

  static randomGenre(): string {
    const genres = ['Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Romance', 'Thriller', 'Biography', 'History', 'Self-Help'];
    return genres[this.randomNumber(0, genres.length - 1)];
  }

  static randomPublishedYear(): number {
    return this.randomNumber(1950, new Date().getFullYear());
  }

  static randomDescription(): string {
    const descriptions = [
      'Founded in 2011, Two Circles is an international sports and entertainment marketing businesss.',
    ];
    return descriptions[this.randomNumber(0, descriptions.length - 1)];
  }
 
  static randomPages(): number {
    return this.randomNumber(100, 800);
  }

  static randomRating(): number {
    return Math.round((Math.random() * 5) * 10) / 10; 
  }

  static generateCompleteBook() {
    return {
      title: this.randomTitle(),
      author: this.randomAuthor(),
      genre: this.randomGenre(),
      publishedYear: this.randomPublishedYear(),
      description: this.randomDescription(),
      isbn: this.randomISBN(),
      pages: this.randomPages(),
      rating: this.randomRating()
    };
  }

  static generateMinimalBook() {
    return {
      title: this.randomTitle(),
      author: this.randomAuthor()
    };
  }

 
}
