export const TestDataGenerator = {
  validBook: {
    minimal: {
      title: 'The Art of Software Testing',
      author: 'Glenford Myers',

    },

    complete: {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      genre: 'Testing',
      publishedYear: 2008,
      description: 'A Handbook of Agile Software Craftsmanship',
      isbn: '978-0132350884',
      pages: 464,
      rating: 4.7
    },

    withGenre: {
      title: 'Test Driven Development',
      author: 'Kent Beck',
      genre: 'Testing'
    },

    forIntegration: {
      title: 'The Pragmatic Programmer',
      author: 'David Thomas',
      genre: 'Testing'
    },

    apiCreated: {
      title: 'API Created Book',
      author: 'API Test Author',
      genre: 'Testing',
      rating: 4.8
    },

    japanese: {
      title: 'テスト駆動開発',
      author: 'ケント・ベック',
      genre: 'History',
      description: 'ソフトウェア開発の実践的なアプローチ'
    },

    completeForTesting: {
      title: 'Complete Book for Testing',
      author: 'Detail Test Author',
      genre: 'Science Fiction',
      publishedYear: 2024,
      description: 'A comprehensive book with all details for testing',
      isbn: '978-1234567890',
      pages: 350,
      rating: 4.5
    },

    firstSequential: {
      title: 'First Sequential Book',
      author: 'First Author'
    },

    secondSequential: {
      title: 'Second Sequential Book',
      author: 'Second Author'
    }
  },

  invalidBook: {
    missingTitle: {
      author: 'Author Without Title'
    },

    missingAuthor: {
      title: 'Title Without Author'
    },

    missingBoth: {},

    invalidJSON: '{ title: "Test Book", author: "Test Author", }'
  },

  bookData: {
    genre: {
      fiction: 'Fiction',
      sciFi: 'Science Fiction',
      fantasy: 'Fantasy',
      mystery: 'Mystery',
      romance: 'Romance'
    },

    rating: {
      min: 0,
      max: 5,
      average: 3.5,
      good: 4.5
    },

    year: {
      current: new Date().getFullYear(),
      past: 1950,
      future: 2030
    }
  }
};