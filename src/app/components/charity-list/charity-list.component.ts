import { Component } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-charity-list',
  standalone:true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './charity-list.component.html',
  styleUrl: './charity-list.component.css'
})
export class CharityListComponent {
  charities: any[] = [];

  constructor(private blockchainService: BlockchainService) { }

  async ngOnInit() {
    this.charities = await this.blockchainService.getCharities();
  }
}
