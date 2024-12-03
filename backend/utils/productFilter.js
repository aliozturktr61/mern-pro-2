class ProductFilter {
  constructor(query, queryStr) {
    this.query = query;  // MongoDB sorgusu
    this.queryStr = queryStr;  // URL'den gelen sorgu parametreleri
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",  // Case-insensitive
          },
        }
      : {};

    // `this.query` üzerinde sorguyu güncelleyin, ancak asıl sorgu kaybolmasın
    this.query = this.query.find({ ...keyword });
    return this; // Zincirleme için `this`'i döndürün
  }

  filter() {
    const queryCopy = { ...this.queryStr }; // Sorgu kopyası
    const deleteArea = ["keyword", "page", "limit"]; // Silinecek alanlar

    deleteArea.forEach((item) => delete queryCopy[item]); // Kopyadan sil

    let queryStr = JSON.stringify(queryCopy); // JSON string olarak kopyala
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`); // Operatörleri değiştir

    // `this.query` üzerinde filtreleme yap
    this.query = this.query.find(JSON.parse(queryStr)); // Filtrele
    return this; // Zincirleme için `this`'i döndürün
  }

  pagination(resultPerPage) {
    const activePage = this.queryStr.page || 1; // Aktif sayfa
    const skip = resultPerPage * (activePage - 1); // Atlama sayısı

    // `this.query` üzerinde sayfalamayı uygulayın
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this; // Zincirleme için `this`'i döndürün
  }
}

module.exports = ProductFilter;
