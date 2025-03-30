import { Injectable } from '@angular/core';
import { Produto } from './produto-interface';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  url = 'http://localhost:3000/produtos';
  urlVendas = 'http://localhost:3000/vendas';
  
  constructor() { }

  async getAllProducts(): Promise<Produto[]> {
    const response = await fetch(this.url);
    return await response.json() ?? [];
  }
  
  async putProduct(produto: Produto): Promise<void> {
    await fetch(`${this.url}/${produto.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(produto)
    });  
  }
  async postProduct(produto: Produto | undefined): Promise<void> {
    await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(produto)
    });
  }
  
  async deleteProduct(id: number): Promise<void> {
    await fetch(`${this.url}/${id}`, {
      method: 'DELETE'
    });       
  }
  async postVenda(produto: Produto | undefined): Promise<void> {
    await fetch(this.urlVendas, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(produto)
    });
  }
  async getVendaId(id: number): Promise<Produto | undefined> {
    const response = await fetch(`${this.urlVendas}/${id}`);
    if(response.status === 404) {
      return undefined;
    }
    return await response.json() ?? {};    
  }

  async putVenda(produto: Produto): Promise<void> {
    await fetch(`${this.urlVendas}/${produto.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(produto)
    });  
  }
}
