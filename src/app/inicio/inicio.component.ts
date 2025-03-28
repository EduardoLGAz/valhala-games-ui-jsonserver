import { Component, inject } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../services/produto-interface';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  produtoService: ProdutoService = inject(ProdutoService);
  produtos: Produto[] = [];
  //produto: Produto | undefined;
  constructor() {
    this.produtoService.getAllProducts().then((produtos) => {
      this.produtos = produtos;
    });
  }

  retiraEstoque(produto: Produto) {
    this.produtoService.postVenda(produto).then(() => {});
  
    this.produtoService.deleteProduct(produto.id).then(() => {
      this.produtos = this.produtos.filter((p) => p.id !== produto.id);
    })
  }
}