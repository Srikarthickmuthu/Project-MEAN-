const Products = require("../models/product.model");

const {
  saveData,
  findData,
  findDataById,
  updateData,
  deleteData,
} = require("../services/db.service");

class ProductService {
  createProducts(productData) {
    return saveData(Products, productData);
  }
  getProducts() {
    return findData(Products);
  }
  getProductsById(id) {
    return findDataById(Products, id);
  }
  updateProducts(id, data) {
    return updateData(Products, id, data);
  }
  removeProducts() {
    return deleteData(id);
  }
}

const productService = new ProductService();

module.exports = productService;
