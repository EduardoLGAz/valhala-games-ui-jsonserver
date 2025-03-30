import { Component, inject } from '@angular/core';
import { Produto } from '../services/produto-interface';
import { ProdutoService } from '../services/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto-add',
  templateUrl: './produto-add.component.html',
  styleUrls: ['./produto-add.component.css']
})
export class ProdutoAddComponent {
  produtoService: ProdutoService = inject(ProdutoService);
  router: Router = inject(Router);
  produto: Produto = {
    id: 0,
    name: '',
    imgURL: '',
    desc: '',
    altTxt: '',
    price: 0,
    stock: 0
  };
  
  adicionaProduto(){
    this.produtoService.postProduct(this.produto).then(() => {
      console.log("Produto adicionado!");
      this.router.navigate(['/']);
    });
  }
}
