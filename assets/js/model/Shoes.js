export class Shoes {
  constructor(data = {}) {
    this.id = data.id ?? "";
    this.image = data.image ?? "";
    this.name = data.name ?? "";
    this.alias = data.alias ?? "";
    this.price = data.price ?? "";
    this.description = data.description ?? "";
    this.shortDescription = data.shortDescription ?? "";
    this.size = Array.isArray(data.size) ? data.size : []; // Đảm bảo size là một mảng
  }
}