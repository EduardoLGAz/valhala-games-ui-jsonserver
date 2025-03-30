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
  produtoVendido: Produto | undefined = undefined;
  //produto: Produto | undefined;
  constructor() {
    this.produtoService.getAllProducts().then((produtos) => {
      this.produtos = produtos;
    });
  }

  realizaVenda(produto: Produto) {
    if (produto.stock > 1) {
      produto.stock--;
      this.produtoService.putProduct(produto).then(() => {
      });
    }else{
      this.deleteProduct(produto.id);
    }

    let venda = this.produtoService.getVendaId(produto.id).then((venda: Produto | undefined) => {
      console.log(venda);
      if (venda){
        venda.stock++;
        this.produtoService.putVenda(venda).then(() => {
        });
      }else{
        this.produtoVendido = {...produto};
        if (this.produtoVendido){
          this.produtoVendido.stock = 1;
        }
        this.produtoService.postVenda(this.produtoVendido).then(() => {
        });
      }
    });
   
  }

  deleteProduct(id: number) {
    this.produtoService.deleteProduct(id).then(() => {
      this.produtos = this.produtos.filter((produto) => produto.id !== id);
    });
  }
}