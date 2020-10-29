export class Product {
    id: number;
    name: string;
    slug
    price: number;
    available = true;
    description: string;
    picture: string;
    category

    
    constructor(id, name,slug,available,category, description = '', price = 0, picture = 'picture') {
      this.id = id
      this.name = name
      this.available =available
      this.description = description
      this.price = price
      this.slug = slug
      this.category = category
      
    }
  }