import { Injectable } from '@angular/core';
import { Produto } from './produto-interface';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  url = 'http://localhost:3000/produtos';
  
  constructor() { }

  async getAllProducts(): Promise<Produto[]> {
    const response = await fetch(this.url);
    return await response.json() ?? [];
  }

  async getProductId(id: number): Promise<Produto | undefined> {
    const response = await fetch(`${this.url}/${id}`);
    return await response.json() ?? {};
    
  }
}
